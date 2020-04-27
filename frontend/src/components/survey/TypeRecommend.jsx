import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import store_img from "../../img/store.png";
import "./Survey.scss";

const TypeRecommend = (props) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/filter/type",
      params: {
        type: props.type,
      },
    })
      .then((res) => {
        console.log(res.data);

        let storeInfo = [];
        for (var i = 0; i < res.data.store_id.length; i++) {
          var store = {};
          store.store_id = res.data.store_id[i];
          store.store_name = res.data.store_name[i];
          if (res.data.store_img[i] !== null) store.store_img = res.data.store_img[i];
          else store.store_img = store_img;
          store.store_area = res.data.store_area[i];
          storeInfo[i] = store;
        }

        setInfo(storeInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.type]);

  let history = useHistory();
  const go = (val) => {
    history.push("/search/" + val);
  };

  return (
    <>
      {info.length > 0 && (
        <div className="typeTitle">
          <Emoji label="food" symbol="🍛" /> 내 타입이 좋아하는 마식당
        </div>
      )}
      <div className="typeBox">
        {info.length > 0 &&
          info.map((store, idx) => (
            <div
              className="type"
              onClick={function () {
                go(store.store_id);
              }}
              key={idx}
            >
              <div className="typeImgBox">
                <img className="typeImg" src={store.store_img} alt="store" />
              </div>
              <div className="storeName">{store.store_name}</div>
              {console.log(store.store_id)}
            </div>
          ))}
      </div>
    </>
  );
};

export default TypeRecommend;
