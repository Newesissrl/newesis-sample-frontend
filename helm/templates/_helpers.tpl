{{- define "mzinga.deployment.replicas" }}
    {{- $replicas := 1 -}}
    {{- if eq .tier "pro" -}}
    {{- $replicas = 1 -}}
    {{- end -}}
    {{- if eq .tier "ultra" -}}
    {{- $replicas = .replicas | default 5 -}}
    {{- end -}}
    {{ $replicas }}
{{- end }}

{{- define "mzinga.hpas.maxReplicas" }}
    {{- $replicas := 1 -}}
    {{- if eq .Values.tenant.tier "pro" -}}
    {{- $replicas = 3 -}}
    {{- end -}}
    {{- if eq .Values.tenant.tier "ultra" -}}
    {{- $replicas = 7 -}}
    {{- end -}}
    {{ $replicas }}
{{- end }}

{{- define "mzinga.spot_affinity" }}
- key: "kubernetes.azure.com/scalesetpriority"
  operator: "In"
  values:
  - "spot"
{{- end }}

{{- define "mzinga.affinity" }}
  {{- if .affinity }}
affinity: {{- include "common.tplvalues.render" (dict "value" .affinity "context" .context) | nindent 8 }}
    {{- if eq .context.Values.nodePool.priority "Spot" }}
      {{- include "mzinga.spot_affinity" .context | nindent 14 }}
    {{- end }}
  {{- else -}}
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        {{- include "mzinga.spot_affinity" .context | nindent 14 }}
  {{- end }}
{{- end }}

{{- define "mzinga.tolerations" }}
  {{- if eq .context.Values.nodePool.priority "Spot" }}
  {{- $tolerations := concat .tolerations .context.Values.nodePool.spot.tolerations -}}
tolerations: {{- include "common.tplvalues.render" (dict "value" $tolerations "context" .context) | nindent 8 }}
  {{- else -}}
tolerations: {{- include "common.tplvalues.render" (dict "value" .tolerations "context" .context) | nindent 8 }}
  {{- end }}
{{- end }}
