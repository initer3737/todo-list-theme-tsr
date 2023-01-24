import React, { ReactNode, useEffect, useState } from "react";
import "../../../../../index.css";
import "./showChar.css";
import { CharsSelect } from "../../../../globalState";
import { useParams, NavLink } from "react-router-dom";
import { useMap } from "../../../../utils";
import { useRecoilValue } from "recoil";
import RatuBackend from "../../../../assets/ratuBackend.mp4";
import RajaFrontend from "../../../../assets/rajaFrontend.mp4";
import PadukaFullstek from "../../../../assets/padukaFullstek.mp4";
import { IChar } from "../../../../Types&Interfaces";
import { IstyleCharsPacks } from "../../../../Types&Interfaces/stylecharspaks/IstyleChar";
import { RouterSmooth } from "../../../../services";
//===========================================
function ShowChar() {
  const datachars = {
    raja: RajaFrontend,
    ratu: RatuBackend,
    paduka: PadukaFullstek,
  };

  const styleCharsPacks = {
    raja: {
      card: "raja__front__end__card",
      link: "raja__link",
    },
    ratu: {
      card: "ratu__back__end__card",
      link: "ratu__link",
    },
    paduka: {
      card: "paduka__fullstek__card",
      link: "paduka__link",
    },
  } satisfies IstyleCharsPacks;
  const [char, setChar] = useState();
  const recoilCharSelect = useRecoilValue<IChar>(CharsSelect);
  const { id } = useParams(); //get char id from param
  const filteredDataChar = useMap(recoilCharSelect).filter(
    (char) => char[1].id == id
  );

  useEffect(() => {
    filteredDataChar.map((data) => {
      setChar(data[1].char_id); //output must be ratu | raja | paduka depend on chars id
    });
  }, []);
  return (
    <RouterSmooth>
      <section>
        <video
          src={datachars[char ?? "ratu"]}
          autoPlay
          loop
          className="showCharVideo"
        ></video>
        {filteredDataChar.map((data) => (
          <div
            className={`show__char__base__card ${
              styleCharsPacks[char || "ratu"].card
            }`}
            key={id}
            onMouseEnter={() => {
              let tY = document.getElementById("showlink");
              tY?.classList.replace("translate-5", "translate-25");
            }}
            onMouseLeave={() => {
              let tY = document.getElementById("showlink");
              tY?.classList.replace("translate-25", "translate-5");
            }}
          >
            <p>role : {data[1].role}</p> <hr />
            <p>char_id : {data[1].char_id}</p>
            <hr />
            <p>name : {data[1].name}</p>
            <hr />
            <p className={data[1].mission ?? "d-none"}>
              mission : {data[1].mission}
            </p>
            <hr />
            <p>perkenalan : {data[1].jikoushokai}</p>
            <hr />
            <p>deskripsi : {data[1].description}</p>
            <div className="showChar_Link__wrapper translate-5" id="showlink">
              <NavLink
                to={"/"}
                className={`showChar_Link  ${
                  styleCharsPacks[char ?? "ratu"].link
                }`}
              >
                back to home
              </NavLink>
            </div>
          </div>
        ))}
      </section>
    </RouterSmooth>
  );
}

export { ShowChar };
