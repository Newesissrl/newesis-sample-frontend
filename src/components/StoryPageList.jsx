import React, { useEffect, useState } from "react";
import Card from "./Card";
import qs from "qs";
import API from "../utils/api";
import SwiperCore from "swiper";
import { Virtual, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
SwiperCore.use([Virtual]);
export default function StoryPageList({ title, query }) {
  const [data, setData] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  const limit = 40;
  // fetch data when page load
  const fetchData = async (page) => {
    try {
      const res = await API.fetchAsJson(
        "stories",
        query,
        {
          limit,
          page,
        },
        locale,
      );
      const _data = [].concat(data || [], res.docs).flat();
      setData(_data);
      setHasNextPage(res.nextPage);
    } catch (e) {}
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const onActiveIndexChange = (swiper) => {
    if (data && hasNextPage && swiper.activeIndex >= data.length - 1) {
      fetchData(parseInt(swiper.activeIndex / limit) + 2);
    }
  };
  return (
    data &&
    data.length > 0 && (
      <React.Fragment>
        {title && <h1 className="text-5xl font-bold pt-8 pb-8">{title}</h1>}
        <Swiper
          modules={[Grid]}
          onActiveIndexChange={onActiveIndexChange}
          spaceBetween={16}
          slidesPerView={1}
          grid={{
            rows: 40,
            fill: "row",
          }}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
              grid: {
                rows: 10,
                fill: "row",
              },
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 30,
              grid: {
                rows: 20,
                fill: "row",
              },
            },
            767: {
              slidesPerView: 1,
              grid: {
                rows: 40,
                fill: "row",
              },
            },
          }}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={item.id} virtualIndex={idx}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </React.Fragment>
    )
  );
}
