import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item, useGallery } from "react-photoswipe-gallery";
import { useSelector } from "react-redux";

const SectionThreeThemeOne: React.FC = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  return (
    <>
      <div className="about-section">
        <div className="section-header">
          <div className="sub-heading">
            {jsonData?.theme_1?.home?.section_3?.title}
          </div>
          <h2>{jsonData?.theme_1?.home?.section_3?.paragraph}</h2>
          <div className="section-line">
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="row box-space portfolios">
            <Gallery>
              <div className="homeimggrid">
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
              </div>
            </Gallery>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionThreeThemeOne;
