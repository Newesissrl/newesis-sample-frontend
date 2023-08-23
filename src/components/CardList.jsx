import React, { useEffect, useState } from "react";
import Card from "./Card";
import qs from "qs";
import API from "../utils/api";
import SwiperCore from "swiper";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
SwiperCore.use([Virtual]);
export default function CardList({ title, query }) {
  const [data, setData] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const locale = (qs.parse(window.location.search) || {}).locale || "en";
  const limit = 10;
  // fetch data when page load
  const fetchData = async (page) => {
    try {
      const res = await API.fetchAsJson("stories", locale, query, {
        limit,
        page,
      });
      const _data = [].concat(data || [], res.docs).flat();
      setData(_data);
      setHasNextPage(res.nextPage);
    } catch (e) {}
  };
  useEffect(() => {
    fetchData(1);
  }, [query, locale]);
  const onActiveIndexChange = (swiper) => {
    if (data && hasNextPage && swiper.activeIndex >= data.length - 1) {
      fetchData(parseInt(swiper.activeIndex / limit) + 2);
    }
  };
  return (
    data && (
      <React.Fragment>
        <h1 className="text-5xl font-bold pt-8 pb-8">{title}</h1>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={"auto"}
          onActiveIndexChange={onActiveIndexChange}
          spaceBetween={24}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
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
