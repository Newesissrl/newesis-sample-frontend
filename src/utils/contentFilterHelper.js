import { getEnvKey } from "./envUtils";
export const titleSuffix = getEnvKey(
  "REACT_APP_TITLE_SUFFIX",
  "Newesis Srl - Be Professional Have Fun !",
);

export const homeVideoTag = getEnvKey(
  "REACT_APP_HOMEVIDEO_TAG",
  "homepagevideo",
);

export const cardLists = getEnvKey(
  "REACT_APP_CARD_LISTS",
  "services=Our Services||people=Our People||projects=Our Projects",
);

export const storyLists = getEnvKey(
  "REACT_APP_STORY_LISTS",
  "projects=Our Clients",
);

export const topPageUri = getEnvKey("REACT_APP_TOP_PAGE_URI", "/about-us");

export const topPageTitle = getEnvKey("REACT_APP_TOP_PAGE_TITLE", "About Us");

export const topPageSlug = getEnvKey("REACT_APP_TOP_PAGE_SLUG", "about-us");

export const formPageUri = getEnvKey("REACT_APP_FORM_PAGE_URI", "/contact-us");

export const formPageTitle = getEnvKey(
  "REACT_APP_FORM_PAGE_TITLE",
  "Contact Us",
);

export const formPageSlug = getEnvKey("REACT_APP_FORM_PAGE_SLUG", "contact-us");

export const storyListUri = getEnvKey("REACT_APP_STORY_LIST_URI", "/projects");
