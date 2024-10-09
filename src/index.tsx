/*
 *--------------------------------------------------------------------
 * Kintone-Plugin "common function -csi.js-"
 * Version: 1.0.0
 * Copyright (c) 2023 C.S.I.
 *
 * -------------------------------------------------------------------
 */
 (function (jcsi: typeof jCsi) {
  // check existing handler
  if (!window.csi_authorize_handler) {
    window.csi_authorize_handler = function (event: any) {
      // check plugin-install-date
      const installDate = localStorage.getItem("csi-plugins-installdate");

      if (installDate) {
        // check 1 month after installation
        let evaluateDate = new Date(installDate);
        evaluateDate.setMonth(evaluateDate.getMonth() + 1);
        if (evaluateDate < new Date()) {
          // check displayed date
          let displayDate = localStorage.getItem(
            "csi-plugins-displaydate-" + kintone.app.getId()
          );
          if (!displayDate) {
            displayDate = new Date().toLocaleDateString();
          }
          if (new Date(displayDate) < new Date()) {
            // check existing license
//            const pluginKey = "isas_plugin";
//            const subDomain = window.location.host;
            // const contractId = "0001";

//            fetch("https://0q8o57r8si.execute-api.us-east-1.amazonaws.com/isRegisteredSubDomain?plugin_key=" + pluginKey + "&subdomain_url=" + subDomain, {
//              method: "GET",
//              headers: {
//                "X-Requested-With": "XMLHttpRequest",
//              },
//            })
//              .then(function (resp) {
//                resp.json().then(function (para) {
//                  switch (resp.status) {
//                    case 200:
//                      if (para !== "YES") {
                        // show dialog
//                        showDialog(jcsi);
//                      }
//                      break;
//                    default:
//                      console.log(resp);
//                  }
//                });
//              })
//              .catch(function (resp) {
//                console.log(resp);
//              });

            // set displayed date( set tomorrow)
            let newDate = new Date();
            newDate.setDate(newDate.getDate() + 1);
            localStorage.setItem(
              "csi-plugins-displaydate-" + kintone.app.getId(),
              newDate.toLocaleDateString()
            );
          }
        }
      } else {
        // set plugin-install-date
        localStorage.setItem(
          "csi-plugins-installdate",
          new Date().toLocaleDateString()
        );
      }
      return event;
    };
  }

  kintone.events.off("app.record.index.show", window.csi_authorize_handler);
  // kintone.events.off("mobile.app.record.index.show", window.csi_authorize_handler);
  kintone.events.on("app.record.index.show", window.csi_authorize_handler);
  // kintone.events.on("mobile.app.record.index.show", window.csi_authorize_handler);
})(jCsi);

/* ---------------------------------------------------------------
	 generate dialog
----------------------------------------------------------------*/
function showDialog(a: typeof jCsi) {
  const div = a("<div>").css({
    "box-sizing": "border-box",
    margin: "0px",
    padding: "0px",
    position: "relative",
    "vertical-align": "top",
  });
  const dialog = div.clone(true).css({
    "background-color": "rgba(0,0,0,0.5)",
    height: "100%",
    left: "0px",
    position: "fixed",
    top: "0px",
    width: "100%",
    "z-index": "99999999",
  });
  const content = div.clone(true).css({
    "background-color": "#FFFFFF",
    bottom: "0",
    "border-radius": "5px",
    "box-shadow": "0px 0px 3px rgba(0,0,0,0.35)",
    height: "575px",
    left: "0",
    margin: "auto",
    "max-height": "calc(100% - 1em)",
    "max-width": "calc(100% - 1em)",
    padding: "5px",
    position: "absolute",
    right: "0",
    "text-align": "center",
    top: "0",
    width: "600px",
  });
  const div2 = div.clone(true).css({
    height: "100%",
    margin: "0px",
    "overflow-x": "hidden",
    "overflow-y": "auto",
    padding: "5px",
    position: "relative",
    "text-align": "center",
    width: "100%",
    "z-index": "1",
  });
  div2
    .append(
      a("<h2>")
        .css({
          "font-size": "1.5em",
          "font-weight": "normal",
        })
        .html(
          kintone.getLoginUser().language === "ja"
            ? "ISAS\u304b\u3089\u306e\u3054\u9023\u7d61"
            : "Contact from ISAS"
        )
    )
    .append(
      a("<p>")
        .css({
          "line-height": "1.5em",
          padding: "0 2em",
        })
        .html(
          (function () {
            let msg = "";
            switch (kintone.getLoginUser().language) {
              case "ja":
                msg +=
                  '<p>\u73fe\u5728\u3054\u5229\u7528\u4e2d\u306eISAS\u88fd\u30d7\u30e9\u30b0\u30a4\u30f3\u306e\u5229\u7528\u7533\u8acb\u304c\u884c\u308f\u308c\u3066\u304a\u308a\u307e\u305b\u3093\u3002<br>\u3053\u306e\u307e\u307e\u5229\u7528\u3057\u7d9a\u3051\u308b\u3053\u3068\u3082\u53ef\u80fd\u3067\u3059\u304c\u3001\u30e1\u30c3\u30bb\u30fc\u30b8\u3092\u975e\u8868\u793a\u306b\u3057\u305f\u3044\u5834\u5408\u306f\u30b5\u30dd\u30fc\u30c8\u30b5\u30a4\u30c8\u3088\u308a\u30d7\u30e9\u30b0\u30a4\u30f3\u306e\u5229\u7528\u7533\u8acb\u3092\u304a\u9858\u3044\u81f4\u3057\u307e\u3059\u3002</p><p>\u30b5\u30dd\u30fc\u30c8\u30b5\u30a4\u30c8\u306f\u3053\u3061\u3089&nbsp;<a href="https://with-you.support" target="_blank">https://with-you.support</a></p>';
                break;
              case "en":
                msg +=
                  '<p>The ISAS plug-in has been used for one month.</p><p>The plug-in can continue being used as-is, but to prevent this pop-up message from being displayed, click <a href="https://with-you.support" target="_blank">here</a>.</p>';
                break;
              case "zh":
                msg +=
                  '<p>ISAS\u63d2\u4ef6\u5df2\u7ecf\u4f7f\u7528\u4e00\u4e2a\u6708\u4e86\u3002</p><p>\u8be5\u63d2\u4ef6\u53ef\u4ee5\u7ee7\u7eed\u6309\u539f\u6837\u4f7f\u7528\uff0c\u4f46\u8981\u9632\u6b62\u663e\u793a\u6b64\u5f39\u51fa\u6d88\u606f\uff0c<a href="https://with-you.support" target="_blank">\u8bf7\u5355\u51fb\u6b64\u5904</a>\u3002</p>';
            }
            return msg;
          })()
        )
    )
    .append(
      a("<img>")
        .css({
          // height: "100%",
          width: "100%",
          // "max-width": "100%",
        })
        .attr(
          "src",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAABcCAYAAABnYKAaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAD18SURBVHhe7Z0HdJzV1a7vWvf+gYQfSAgxNfSAwQaMwQZT3A0E01tCNySmt9BDL8YkEMC4yEW9997rqI3KqPcuWcXqxZIsyTXvffeZGXkkj6xuGTzvWnt907465zxn71P/DyyyyCKLTGSBgkUWWTREFihYZJFFQ2SBgkUWWTREFihYZJFFQ2SBwjSptb8fuuZWhFTXwqmkHFb5xfg+twA/5RXCtrgMvlU1SG5sQlV3DwYOHjTsZZFFMy8LFKZI/6WVd+6GQ3E5/h6dgMXegbjO3RfXcbvAPww3BoRhUWA4bgmOwG2hUVgWFo1lgWFYzddPRcdjXVYuIuoasKuvT39AiyyaIVmgMEn1HziAyJ11+FtkHK519caV7v6Y4+6HqwmEa9x8MY92vYcfFnj640bvACzyCcQtvsFY7B+CpYTCCkJiVXg0/hylwWrC4a/RGnybl4e8jg4FGossOtayQGGC2nfoEAIYAtwTEIpL7N1xqZM3LnPwwBUO7rjK0QNznT1xjYs35rn64HoC4gaCYaHXMChw3+VBYVgZHI47QiLx57Ao3B0Vi/s1SXhYk4D1OXko291tOKNFFh0bWaAwAeW3tuMvwZE438YFl9i54RpnLyzy8Mcyv2DcFRKOhyOj8Wh0HB6P0eAvMbF4kO/vj4jCHcz8ywiCWwmFW/nbpYFHQmE1vYZ7ImJwP/d/JEGLJxK1sCurwO59+wxnt8ii6ZUFCuPQvoOHsCWnELPt3XCxtTMWMSRY5h+M24PDcFdYJO4Oj8J9UTF4KCYOj8Zp8ER8Ap5JTMJzWi2eT0vFS+lpeIHb51NS8Di/vys0UnkLK4PMQIEewwMEw8NxCXhMm4Z3dRko6uoyXIlFFk2fLFAYo1r6+vFCVAIuondwvZs3S/tALGZpv4yl/UpC4U56CKsJhnvpFTwYHYtHY+PwmCYeTyUkYk1yMv5OELxIKLyaqcM/sjPxbm4W3snJxgvaFNxHEIi3cOcwKDxIKDxEb+ORuHg8oU0lXFIRVt9gqWuwaFplgcIYVN7ZhQcCw+khuOMGD9/BCsPbfINY0gezpA8dGxToJbySkY43sjLwdk4W3s/PxSeFefioIA8vpqTi3rBo/Jnexj2RR0Lhr5oEPJmkxTMEg2NlFfYfOmS4OossmlpZoDCKito7cbt3EK508sK1bj6YTygs9PTDIoJhslB4Ly8HHxIIn5YUYF1ZIT4iJB5nuCDewn1moPB4fCKeIhie02XCurxCVXZaZNFUywKFo6ikvQurvIMx28Ubc2nXuHpjvjuh4OV/dCjEEAoEwhNJyXiGHsDfdDq8kJmJV7Kz8DpB8BZB8F5hPj4oKsBHtE+K8/FFaSG+Li/G5wTEmsQk5S1IncIQKBAwTyYm4+nkFPw9Iwv29BgO/dcSTFg0tfrFQGHvwYNo7u9Hxe7dyO3oQEpLC6IbGxG2qwFRTY1IbGlGRkcbirt3o6G/D70H9jM2HzlDNfT04s++objM2RtXOHpgjjQxChTEUzAHBQLhHmbiBzSJeISZ92lC4c10HT7Jzsa3hYXYUloC64oKWJWWYkt5Cb4vLcI3xUX4nFD4vLIEX9dUYH11OdZXluJLAuKF1DQ8QG/hYXNQoLfwLMOI5zMyEVxfb7hiiyyaGv1sodA2MIDU5hZsKSzC3+MTWLJGYkVYGG4JC8bC8GAsiAjGrZpI3JoYjcWpGtymjcVtiZG4MyUWD6QnYG1OGl7J16Gg+8ga/T379+PJsFhc7OiJS+3dDFDwOhIKfsFYTg/hdpbq9xAKb2hTYF9WjrSWVtTt2YMeHmekkvwQgbTnwAE08z6KCKqIlkZY11ZhPb2Ff9dV42vCQcDwYLQGjzKkOAIK4i2kpeNlgiGns9NwVIssmrx+VlBo2tMH38pqrGUGuZEZ8wIXD1zo5oUrvL1xAyFwS3wklmtjsDw1BsvEUvS2lK+XytbwellaHJbp4rGU2+zdHYaj6/VfZuL3k1Jxgb07LrJ1ORIKhvDh5oBQLAkOx2PRsbAuLkU5PZQDhybnyh/kuZsICU1bC6xqyvWhBEOQh2PNQ+FvDE1eIBQ+yM5B6969hqNYZNHkdNxD4cChQ0htbMZrmmTVS3CWgyvOcnTH+Y4umBfoj8X0BlYYIZAaq2wQAEcxgcJTOSnoZhhhKtficpyz3RF/3OGkmh+P9BT8cCM9hCej4hBYvRPd+4buP1WSQVJ5PbuxubJMtTr8NT5RVTQOh8JaehOv5ObBobrGsKdFFk1Oxy0UBAYhVTtxr18Y/rDNEWfYOONMayecbe2Iub6+hEHEIAjMZfrRbHlWIn6oKjWcTa/Krt2Yy5DhHGvnEaGw0McfNiUl6KPrfyx0gN5DYH09vYQkPEEzB4UXdTq8mpmFfEvnJoumQMclFNLpGdzjE4JTN9vi1K0O+K2VLX63xQ7n2znjpqiwcXkEI5mEEBldQ0OH56PiMcvaBedsczgSCoTFAv8AbGKsf6wlgFyfW4CnUtLMQuGF9HS8mpuL/xQXY59lGLZFk9RxBYXOgb34JDEdZ2yywa832eGUn3bg1E3WOJ12uZsnlsRHYXna5GAgJqHDk9mp2L3/8HiCpPpGnE0AzaINh8IcJw/cGB6C14sy0TMs3DhWKujsxFMEgvRTMAeFl3UZeD0nF6ltbYY9LLJoYjpuoKBtaMJCRx+ctNEWJ/24A7/+cbseCrSrvLyxVBs9ae/AaMszE/FtVYnhzHqtCY/FGducMMvK3gQKzrjK2QNL4iLxSI4W1X29hl8fe0krxr8LivBMms4sFF4iFN7Iy8MPDG0k5LDIoolqxqEgiX1bbiF+z1DhpJ9o329TpqBAu8rLx1CRODVAEJPQIb2r3XAFQHF7J84lCM7YbDcIhfO3O2K2szuWSkVmehzCWhoNv545Jbe04qnkVDxDIJiDwmuZWXgjKwulPT2GPSyyaPyaUSgMHDiIdzUpyjNQZgCC0a5gyDAmIEgdQ7oGyzMSsDwrCSuyk7EiR0yrN74X70DCBvnNE/ysyyR0+D4zF6dZEQqbbBUUJIy41N4VywiEVdlJ+LAk97joOdi9fz9eT9dhTUqaWSi8mpGJtwoL4bpzp2EPiywav2YMCt379mFNaKzeO/hh+xAY/Oo/W3GurSOWJUWxVB8ZCAoEhICU/Pcxw7+cn4H15QWwrq2Ea0MNfBrr1HZTdRk+YMZ+IjsFyxiGfFdZbLgKvW73DMJpW+wVFP5AKFzAsGFJTDg9BA1W8dg5u4+fzkFbSkrxLAEwEhTezM3FpwUF2NXfj337D6h+FxZZNB7NCBR6WeI9EhSBkzbaDYGBAgLttA07cDMz5UiVigoGmQm4PyMR6ysKEdfWjNZ9e3G04UGSOWQAUXFvN+oHDs+DuLO7B5dsd8JpBIJA4SxC4caQIOWhrMiIx9rcNMbox8/Ao6hdjXooaM1D4XWGD//IzcEHebn4Ki8fX2XmYFN2PjS19egcGDAcxSKLRtYxh4IM+V0bodFXKA4DgoLCt1a42tcXK8wAQTyC5ZlJeIgwcKqvViCYrOJrG3DKT9Y4jfbbjTaY6+WD5RKO8HwrGGq8mK87rgYdlXZ3q3kVnmUIMRIU3szOxjv5+fhnSTH+WVqCV/n+7rBILPUOxJvxWsTUNagu1hZZZE7HHAqfJ+sYMtgcETIoIPxnG862dsDy5CNbGsQzWM2SW7r/tk0BDIyyzy/BKZvscCqhcL61E5YlRg+FQm76UT2QY62OvfvwWroOz6WmHxUKb9FbeJfewvuEw0cy8IpweK8gH3dFx+ECW2fc7OmHTXkFaO7rNxzZIov0OqZQ8CytwCkbrM0CQRmhMD8oYGjYwAwqvQ9fzEtHYc9uw5GmTuvTshQUTicUFgYHYqUBCMcrFPoPHsTbGVl4Lk03Zij8s7AAHxcV4jN6Dl+Vl/L7LCzwCVRdxhd4+WJHUfEv0nOQTl8yuK13n96kYvtYeH1y3n6e61hImp8HDh1U6aL/4AEVIh9t9O9YdMygIM1+F+1wwUkCBTNAEC9h1nYHfeWiwUtQdQdpGvxYVYLeaUq0b8Qm4TebbFl6umCFoS/E8QwFSQQfMOP/jd7CeKDwEaHwaYl4DMVYV1GGL7i9LzoG5zq64nxXT9wZGoa4XbsMZ5le7T94CF9odXg1OgGfJqfjm7RMbMjMg1VuIbbkFOCnrHz8i7D+jN+9EZuIdxnytPWPzaORHp2xO+vxjiYZK70CMMfOFZftcMblNi5Y6OSF+/1D8XZsMhwLSlDa0aky8FTrO10O5tl7oHnP9KzhsZ9pIKWzDRuqS/F6YQYey07Go1lJeCxLi7UsPP9Zkost9KgjWxvRMNCnRuSOR8cECpII7vULHbEeQex/vtuKq318B70EaT68Q5eAwObpnS/glcgE/IbhzMKwIFWPYQTC8QoFKek+zM4hFDImDIUvykrwJT2GdbQnk5NxsbMbLvDwxuVe3ljHY8uQ7+mUjAa9X9KDFBBb7HGSlYM+bUhYabQt/ExMPDhm5rb+0StJUxqasMozkN7oDh7TESdt5rF/pFf6A9OYbAn/k6z42WY71QT+e55nhUcAfszIRV331PTtEBD8ydpVnds6r8jw6dQpu7sTrxToVGG5siANK3K1qvAcbJYnIFbmp6qmeHl/V6oGbxdmq5a49v1jC7uPCRRs+HBUAhgpbKD9L/+0W+LC9SU1gXBPZiKSOloNR5g+vRypwe+32mOllmGKiZdwXEMhU6AwcU9BoKDAQFtXUYo1KSm4xMUdF3l44jI/f/w1Nhbl3dO73oSMAi1oa8cPzJBX2jATSab9fqvemInP2WKHL+gppO5qwq7ePdi9d5+CyUhyKSrDmZsJE4aCcqxFzj74ICEF23OL4FRYqjyQjxJTcbdPCM4UOBA2Kj3KlvARr2UqZJdfzLROKPG4KzwDpnTKPL+mOlVQqn43aXFYm5OKzfQIAprqEd7SqL7fXluhIHBHWrzqk6OvnE9QoHCoqzYc6eiadijILMhzHTxGDBvEVAXjDkdVwbg8Ix4PEAiZw+Y5mC69HBmPyz09j/ASjlcoyAxT72aOv07BHBSMJh7D08lJuMTdA5d6euGKgAAsCQ9FfFOT4azTow6W/jVd3diYlcd0oIeB2jJTSdhQy9K7hGFnYVuHMlmNy5xCKmtwhuoRa43TN1rjw4RU5LS0qlGvJQwRJHSV48gEvHIc//JqLPPw12deOd9GG4YVYYajTVzSsrbSK9AAHCnotiGpYWp6wka1NWOVeAJMk3emx8Ourgrle3pQ19+H2v49NP22nlbT1wtNewteyE/HMuYnVVHP8OL7YaOCR9K0Q+Hb9Bw+pJHDBjEJHS51dWcmjMdqXSIyjhEQRJL4Fsbq+0T8HKCwW3o1pqUTCobWB25f0OnUDEyvEQivEwhv5uSMCwoqlOD2gbg4XOzmjj95eWF2YAAWhgYjoqHBcOapl3g9kpEkU58iQDCBwvq0TJQxQwsYugb2qkpCcx2x2gmWeQ6e+oxID+GdeC0z/24UEgJlHV1o6NmDtr4BdAwMoJUFVGMvMw+PmdHUitu9gvRgYIF1q4sPuumNTEYJdbtw6k+GcEXug+HJS1PggbTuHcBj9AoECBImSOe8ekKgfoD3tm8vdh/Yr+YFkV668n7X3n7UDfShsHc3XinMIBgSVI/ej0tzDUc8usYMBflTNmfn46OkVNSMcSmzdv6Zc+yO7iUoIxSuZSK8g25ODIl4LPUJS1iZgcl0pqbjGQpVvb14gSBYm5WN5+kxPM/rF0/h1YwM/IPv3zR4Cu/k50H6KXxYVooPi4uOCgWxrxhGfFxSiJsDg+gteOIKXx9cFRyImyJCEdc0veM+4pmZ/ncYFL5M0aGJGXg0Sdyu0heBcPE2ByTXNyqvQAAwUrghMOrbfwApDE3+tIOhy0ZbXGPvhsZJVgyq/jcSmsg9iPGaLtrhjPqeyQ2kc9+1U2XqZToNnszWonRPNwEw8lR/8mnfoYNoIhxkjM/99CykrkH63IxFY4ZCFyk6x8kLJ1u7IZ4PfiyyKygZHQg06da8MCIETvXHfvag9UX5WCEPfBgQjlcoaJqb8ZI2Dd8XFiOgrg669nZUEhQy12PHvn1o5ba2rw85XV0IY2a2qarCl8zsn0mLQ0X5iFAQk1aJlzMzMJuegoKCvy+uDg3C4uhw5HROn/c2EhQ6+kevGPuL6hlro9KZhAT5be3KexirtrCgkxL9vK0O9C4mfo8SqpxrZa88BRnINwgGejBSmE5U0jrydnGOgoLUDbxflH3EbGEjSfZtp+dgQ89C6iGkdWIPw8/RNA4o7MXVjh44eZuT+hNHk7iFt/sEqwduDgSmdjL/0PdzMmck822sLvlZQUEmrG2jBzZyldtQSWnSSbcypaMd2wQQleX4qqrCLBSk4vEr2p1RUfiTjzeh4Ie5gf64NjIUDyTGoWlgejo6TRQKkiavk9BBhQA7VAggIcNYn41IxuAs9whQ+4dV1xo+Hb+kGVJaHB4ODB9aX8G0faur74j1IaNJBsE9mpls6NqfOO7BedKELXUPz+Wm4i5dPGr69hi+GVljhkI3/4C/8IavtXNFRqPexT/aYJucljac9qNUuIzc4qDsxx04j6CpmqHVlR3rq39WUJiMBNQ5u3djU3UVvt5ZreoShoNBvIU3c7JwlZ8vrqSnIFC4JiQA82Mj8Q4/n465GiYKBZnI94/bHJWbLnbOZltkNo+/xaqsswvbcwuRPYF9RT0Eyw30ouX6PUoqsCEz9zAU+NmvaZq6idXNdBDod6XFq1YEAcNjDB9MR/iORb0HD6iK+4jWRnoKo8NpVChIxj9Al2MvidVFt7SdrmofAXGA5Dt06L8jguHf6dlj8hKkEvL5yHjDXsde3rtqTxgoGNXL/9OvaZfyGL6UsMIECuItSMemlVGRmG0ChXnhQbghJgz+9RMvTUfSRKHQyjDhT4zZFRQMpfKrUeNPS1Ly7mLcL4PjxlMKG+VfUa3ChBvotUh9RjULuEFYyXUxH/wtPM7w6/FJAHA/0+Gy9LjB/jvS8jAeyR1JZWULbSwTjo8KhUMsXfYRCAN0W/v6+rFHrL8fA4xVBBbmHqKA4qHAyKN2Vho0ehJRNXWGPY+9/JvqTzgoiORfS+pow9dVDCcYUpiCQbyF59JSMdvP5zAUwvRQuCsxdsrDiIlCQVYBH2wCNJbKzIgfJaSq7s3jkaTjifRulOT/cECE6hD1YWKqCmlEAgFV1yHXxWv641aHMVfQm6qPeezZvDQFA2O3/5X0HKT+TTy/sUr+b6l4PZp3b9QRUJBWBqm5FZMbPChewr796KGr1smb6qD7uZtE7SOlZby+QGO4WgmNCxkSmJs4ZYjxe6n9lXPNlEKad52QUDAqs6sT6wkFqWswQuErQkGaMecHB2KOCRSujwjGjQnR+LZ0anvqTRQKonfiUw5nPgMYBBJL3f0QWzv9q2dlMeQ4fcN2nLXFDjE76wbBEla9Eycbr0e2vKYfGVZMROvKC1Q/AwUFSZtpsViuS8A/CrKQ1901pow+Hh0BBf/yKly01REX73DCkyFRDBsOYJ8BCl3d3WjvIhToaom3IB6EOShIG/BvpC5htPoEehKP+EcY9poZBTc3nNBQEKV1dqgwwljH8KXAgSHECoYQVwX6DYHCQnoLyxJiUNYzdXVAk4FCdksb/iDdmVVaM4BBZUIbnEZ7OCAccbUN0zbLtfSaPHmLA9NxuOp5aZTMGXKDo5cKaYz3dJOzNz2Y8Vc4Jra3qB6MSwkDIxjEpDXiDp0Gn5Xmo6Bn94RCH3M6AgrSJVT1DeeDXu4diAHehNQf9DF8EDB088Z7WbIP7N2nr1cwcyFuxWWjA0GMf9onyemGvWZGFijoFdLcpCofB70F2mNJibgyYCgUFkSFYlFyLDZM4VT3k4GC6OOktKHegtHkePz81I3WWObmD4fCknE1V46m5r4+XGbtwvNshX1BCb3soRleRuAOv66ICbRwyOjHL8oM3kLqYSgok27MWYkMKTTKc4hpa5r0jONHQMFZoCAxGk313SZh/0tvQEIFAcEAQ4p9+/RAGMltWZeSqTK8WRCYGsMH6cswk7JAQS8Zhbq9difWVVcqKEjX5+fSU1RfheFQuCkhCg+lJYy7FnwkTRYK0hHpqZBofQY0HsPU5DOVpm3UaMlvUjNVy8VkZZNfpDor3eDorSoYh6uIn80yjMVQ18HzPx0abfh2fKrt26PGNKhOTOI1MH0OsVSGFPQcpNfjk9kpqsNT1wThcAQUHElTNbpsswOWewUPul3S0iD1CwcJCNlK2DASFF6KScBJ25xVeDBo5jwHfhZcObPLnVmgcFgFDAm+IAxUt2eGEy9mpGPusPBBoHBjbBhuJhi07VMzYG2yUBCJW/6eRqvGPigAmIOD4dgCj0sZHm/NLcDeCc57IPlC9W+gV/3PhFQVLpjTg/5heljJuQmHc6zsVBPoeCU5bSfBsK68ECulhyIBYJxiYLipCYqZpmWC4rDWXeNuRj4CCtIP/Wo7d1xDWxsRN6RGVoDwYqQGt7n7qQcinUWkfXe45Bhfk8bfpmerTh0yNn4Oj3dExSOhED2DLQ+i4VAYfLiyUK3uxIKC1E7b19NbqKlSUHg7LwfzgwIJhcAjoHCrNg4/VkyNlzcVUBBJKCsVfLfTw5X1QpS3aiylh5vAgfC4zzcENbvHP2w6rrZeVSSevcVOzX85UraTfgvqXMbz8pq+YX6YiOT+OvbtRVjLLrycn044yAjIETwHmoID7bOyfNXbdawaAgUp+SXjCz2lLmEft3IhRo9AEs0id3+cLGPghcZWDvggMU19dzTJfqu9Q/V/0jAoTKYX2VQoqLEeS2Sp+sQoE5Ml7CNxG0m8NivthIGCKLu7S/VfWFdZjvcKcnFDcJBZKNySHIsXs1OZGcZXCpnTVEHBKCm1A8qrVe/Cs6R+TNKdZExz3gO9WOkVWTzOLs5SYMqQ6yeCI486kKpjYK8qZAfBwO18R3fVk3Ki2v/fQ2p1coHD+yU5uFs8hwzCQZoth9c5yATEMu6hIANNe8dWnzIIBcn40u9gP2PL/QKEffu53T/YSUkcGAUFegcKCOqB2qi22dEk+93lE2IWCuEzDIWAXfUqgS+KCz/Cbk6KxrMZ2hMKCjIK87vKCqyvrsR7+UeBQmI0HkiLR/MYE9rRNNVQMEqGmWc0tUDmBb3O0RO/loxpTLumxnR8q5ufWrZwLJJxDudIwUjP988+QfiK1yqjOr9OzTjCZFapefbiJZt4LHwdOAVhs+Qr6cIuvRWtdparwVLLCQgZFTkEDDQBw9vF2WrattGkoGD0EKSJsZ8E6t2zR7Uy6Dsp7VN1CPwRfzP1UJjJjksi/4Y63BgfjQXRoSrBm9pCTSSeSUs+oaAgcq6vxb9qa/BGdhbmBQWYr1OIj8RielMF3ZOfN3O6oGCUpG/pO+NcVIpFzt48PtPv8LCCHsMnSaN7vSIJh1UeEBNPxDhL1EgmIydNz8d8IEscTJWkyN576KAaTu3dWIdnclL0XsOwsEJCDb+m0ftu6KHAzC4eQj9JKTDoIAnbu7rQ2d2j749Ar0EqFqV+YaqhEFAxttlgpkvSbff6mAhcFx5ssCBcxwwgNj8qDE9qE084KGjaWvHvup1Ym5GOOWZaH/RQiMBtyTHQTsHsWNMNBVNJhzyp7/qdVEiaZlSeU7pM15v0NTAncfuvd5JBWNa41zcY78Ql483YJLP2luE7mRNytq3L4fNxK7M/FbQeXrpwqiThfsNAP76vKsZKQsG0vkFaJtbmj76OiYKCHMjYF6GLIGjt6EQLYyyBQw8fkrGT0oGDhIKr72HySc3rGKGw2tsMFH60hk3e0NWajrU8d1ZjXmSoSvhiV4sF8zXt2vAQPJYYTyhMPm7+OUl6OX7D5/JMmvkmSQUFTQQWp2oQNQVrbB5LKBjlXlKB06Ti23hObk/+j5WqiziafMur1PWda2WH9MZmVVBKmHI0E1nlFBwuTMVYoMrEtNMlqXdwbqjGslRCwdBKIYBYrUtA5SgLJQ+GD1KfIKFDD0OHDkN35q4eegp9h3suSoghJf7ZhIEM+JA2WImbhqubnkVC/S5liTQZIXaLwET17jIAQYyQ+Fw7tokfpksOFRWYGxaCOQF+yq4aNF/MYSz9aFycguaJpNLeXtWr8f54jXoWI0IhTYOIlsnPAD0RKEiJL7X4QZOIzV+I1BgKKkNG5Xm35RYYvj1Skg5UEyNDAqlglHkjxyqZ7enC7dL13+At8Fxz7dx4jyPXyUgnJBnFa7oY8ni0j2B4pyhLP2OTeAuEw7KUWEL/6JWqgxWNB+kFqBCCD7u3r095CDK+YS/dJfnc2AIhtakyY63MvShbc+2zVV3d+K0AgOHBEAgMN8ZxT4fGGPaaGdmVl2E24+YrfLyH2OWyDfDHw7HRJxwUahkySgemW8JCMWekfgqEwm3aWNUFd7KaCBRkvMwVDu6qX0L0zonVS0nzpTrn4Hm3H3VClOyWVvyW5/vND1vpaZQbPh271gqE6CGYQsi9eOTjSDPivVnJanlEqS+YiIIJbalLMEJBLK2zzfCteQ1CQVU2EgwHDhxUnoFqfSAM1EhIegjjUQ/3XeAoFTryAAQMI8CB4LjewXNcxJ1q2ZWV4TI/P1zq4Xmk+fjivqioEw4KNYTCe/l5uCYwYMgoyeEVjbKa1lQs0DPR8EGNTrRyxN8j4iY0pkDc/9Ok5Dael6+PFs6+l6Cll2CPG529Udc9/inWBF7DB0nJ7NIjSUZBvpavw8q8VLg0TMwjyu/uGqxXkK3UM+T3HL3z1CAUjBIAqFCBMJBwwRwQBCBGG0l/Dxcq2h0GgDmjJ3Eq/wiZYXemtLWoGBd5eeNCF7cj7CIPL9wTFnnCQaGY4cNfkhJxxbCh06ZQuCUpBk/oEqdkjYiJQuHNuCQ1pfsftzmpDD5eyRyNg+el/e6nHSM2kTfRc1bjHOjdfpaUPqE0IatULXA0zBRlgMMZm2yQ2TSytyUrpMv07M9kp455GjZT5XV3qslZFBS4fSAjadRm5COgMJpMgaDM8PlwudAtGnXotBhjOun1OFP6V04uznfzxHkOLsPMGee5uOOu4LATDgrJ7W24KSxk6CQrw6BwK0OHd3IzDXtMThOFgqq8kwxGj/OlKA366NmORxICDGZQbucxHKnqMu/5WNODENdf5mGUUcATldSDDAkh+FpWsxpJrvQQVK/FjAS+3mn4dOzyaqwdDB+ka/TrhaP/Z2OCghEA0onJ2MFJBkiZhhfyvalkBtvzpI12NDAQCovd/NQ8DjOhrzOzcbaTG86ydcRZNkPtbAdX3OEfqlpPTiRtLCnBlUGBuNIwR6PZ8IGhw8fpR1YyT0QThYIsD6f2obcpsb5j0dhHbkqrwJ3eMoeooUWA23c02sHWAlNJ2lTzLjJ0eDI4Sg3AmqiK2jswSxatUfVt+nu9zNp5xAFaUW1N+gWSWMrfy1J+POGadFSSZeSME7QIHGT+kNE0ZigYOzfJSMk9fX1q+LTq3LR3r+oBaS7MeCY0RrlbZmFgND6cX9PkD54JrdNl4Uw7F/x+uz1+v22Y2ThjlU/wCQUFqTheHRWlKlmlOdIcFBZpwnF1kH4o8lTIHBTWpWao9R6OpgKGnTLBiR4MO3DBNkd4l1aqTnZHk/i3X6VkKJgYgTDb1hU5I8zRKJO1nPy9FX7D33rx+JOVzPEwpHmS92ttZgyRKKe7Cyuk67KAISMeT2aloqR39Lks5AnIepKyuJICQlYSXqGX0DuGEGRMUJAMLxlf+jHIBCsy0UpbZ5dqupQmTOPcCsO9BYnPTjZkfLNAMBq9hYf8wmfETX87IQWn73DC6Vts9UaKD9o2Byz18j+hoBC9axcul8Vg/HzNQyE6FDfFhOFiO1e1duNUSLnUyqM8nElk7dEiZvrhacpU4urP2mqvfq/24zF+v9lWLQGna2pW4YTp/lJxl9fajjWhsYZ0KWnPWo2P8CqpMPxqqKQpUY2G5O9O3aCfmHUykrT0GL2N4VCYa++uumQPl6wAdScztLG0lzDinvQE2NdVqQVfZASkaRAv74sJjU/K8vV1CYSJAOHRLC3K9oxtYpwxQ8E4+5LAoLG1DbtaWtFMV0imaJOmS/0YiaFhhLhiy9UcehJDmUBguBEaMlNTSOX4Y6bJ6rnwOJzCOPGUn3YcNv5JyjbZYglDmxMJCq9otbg8IGBw3YfhULhRgODuqWYVkoqziUqWU/uCIcJKZrhTpLQXKEjJbTSmhyusXdXAI9eiMrWw0PB/QdKXdE2WdSdVJpN0JoDga/Eg5tm7qX4Fa8Ki8XhwJG528cHv5HcS06vfW6vBSsOH78titj9l5qm5D87b6qj/rbquHfgDC4snmKllqTtZC3OskkpN6ax0m6ufvgXC9F7FNlira7uLnqn0uJTJX0WyFuXGqhLczQwu7r8aMs3SX17fxc/W5qbhk9I8fF1RiM/K8vAc38vycisIAuPvZRGYsj1jHwk6biiIl9DEh6GgwK30gFRQoCdhjurepVX8g/lHjeYtbLDBQidvyKIzx1K3ewXhZIY4J7PUUMZrEZMFav6XJchf4uKOSIy/VKXzP53t6YXLfXzMQuGGqBDM5ucC0U+TJ97pTOYiuFnGIBC6kkGkZ6GU1ucxZheTTC79XMRdlwx5npUDXXiZUs1807jMwiyZdLVviBqoJD0TFRx4zJO3OuHkbc5qvRK1wjU/l1DlBkdPNYah0Uy35kCZnVnAwd/9fiPPv9VBXddZvN5Tf2RaFQ+Dr1+M0ow5bciERep6eE+ns+CZtclm8H7FZAXsU42h0BYHNe2AqRr29qmJU/5RlK1GRaqh/vQaVuSlYFWRjpahtityU5SHsDI1Di8TBoHNDdjDAns8Gl/4wMxvGj50dkv40KfqFUbqzyAu2yrvIP65o9QtiPE3srbjsZKsLziHbvDwnpaytuVpLBGujw7HK3ywJ0I3Zyl1n4yLx2W+fmotyeFQmE8v4UqGFKdb2eFiayfUMCNOVBImyrogss6CjDiUjCmd4cRk2nbZSsWblJa5/J241SNNYmKqA4f+q/aLr2uAbX6xKnGlZl/GH7yr0WJdSoaaWUxCiKO1VMiUbTL3o1SWSwc9uSbjdcm1ykK1Ol5TRdfYJ0vJpXctk7xWdO5WczmaHldM3sty+MUdnWql7ZGWmjvItNhuGBkZxAwvPR437yzHxpoybKE58310WxNq+vdMeMXrMVc0Km+Bf4z0eJQKxl7ehEBCAcEQOowkWXhTzYgzmrcgYQRLDefCMsOe06sYVXst13T4usRDONvOGTdrwrEyK1HR9kSAwvbiElzs5a1WnR4OhWtDA1UPz99uscVvWNr9J2PmmpAtmn6NGQoKDDTp8SjzLIjnIDCQXpDG74+md9VU3GPwFqSyiL8Lqpz+0ZNvsRQZck0EwmXMFGrWpdRYNR3biQCF+F2NuNLLBxd7eKmenINQCPDD1UEBasHZ07fY4H/p1i/x8Fc9Vi365WpMUDCVEQBGSIwGA6Pa+wZwswyKGksYQXf+nK2OUzIRxUiSCTVkQIqc61f/0Z/3T95eCgbLDStQnwhQSGluwfU+frjQ3QsXubkPQkEWgpEWiD86uSognMpwahbjchnkZtEvW+OGwmQkcdg5VrKcljQhDQPBMPv1Rhv8nq6q9FqbjqZKmcdBruN/6B1IyCKLnqxIk1FkeiAMhcIvU2E7a3GNBzO+qycukG7dbh70lAgFb29c7O6BWTaOqmlW6ldO3eqAz1NmdkSrRcdGxxQKIqfCMvxmDK0RsvzXKZuYIK3s8GpcAlr6p26+ftFD/hH41QYb/GG7AxZEhhwBhKFQ+GV5CrIC8vfZubjIxQPnOrvjfEcX/VgPegoXurjjHDsnnLHVTtUhiJ2+3RF3B4RhvEuxWfTz1DGHgkgtPjvKitQKCj/tUG7r73Y4YZ6LN+yLSsfdv92cpEb73B2OjJu9sTQpSoUMw4HwS4WCdlcT7gkMxyw7V5xt74Jz7Z3VWI9zaWfZOuFMQvKMbfYKCr8jkH+7zUENUZZacYtODM0IFETSPKTvsGI+lBiEwiZrVVqdwUz8B1tnLPEJgGNJGRr2jH98uUxDVdrTjbczdbgpLkLfQ8xQf2DOfu5QkKtuGxhAbns7XMorsDY+EXPdvHChvSsucHDFOQTCOXbOatzHLGs+X2sHnLnDQXX5VlDYao8/EAq+FeNb5XisGl4fdTw8ZdNrOuL6piGMNaejXoNhKzJ3PaYfHfnt2DRjUBDJgpunSB8B8RpGgwITqZRis5igz3FyxzXu3ng2VgO70jJktraibs8e1ZYt7e3SN2KA226+r+ntRXp7G7ZVluFZnRbLEmPUmgUylfvi5GizMDCaQOGVwqkZ9DMVkqE6soSYrObUQ2tnhm/s70NFdzdyOtqhbWmG/86dsCouxgc6HR6KisLNAYH4k7snLvLywYUe3vgjw4PznPSegUBBml+PgILyFOyVh7YufWJrFIyk+t09+FdiKj6JSUQRPbY2wv27xHR8HJ2ALHoxyTvr1et/J6bBJjMPH/N3BcPGJLjkFmGXyXwGBS2t+DIuGevitdjAwsY2Kx/de/eikyHnp7GJ2KrLwdfxKTStev2lRstzt+On1Ex1HTsycvF9sg7b+F15eye+4LG+iEtCmWFIf0ptA9Zxn/zmFqTV78I/o+LxXVIaGsz01ZDQzDE7H+sStPicx8hoaERbXx+Pn45PTc61IyMH/UyfNswDH/F4G3kt8hyKW9uxs2u3Ot/7ERpkGoaEJ/K5fBmrVddiy33ejYhDlGF+0z379sMuK0+d75uEFKxPSFX3HltViw8jNfgPz23NfT6OSUDpGKYpmFEoiFwYEsySnmbDukKPCAUZvciY91wnN1zAUu8iL19c5uGJhUz8q8LCsDoyEvfHxSpbHRONxZFhuD4yBAvjo3ATbZEmQs0adGtC5OhQSI/Dqjj+zs1XdU81tVtdfXEzQ5rHI2PwUTH/2JJc1d30U24/K8nHxyV5/CwP/yzJ4Wv9d9If/Qt+90VpPj4vzsNntE/FCvk97aPCHHyUr7cP87LxVk4GXs5MxXOpyXg8OQF/SYrH/fExuDsuGqtjo3F7VDiWhodiQXAgrvL1wWx/P1weSAgEBOAyP39c6uuHSzy9VQWi1Blc4OymWhPOcxwFCuIp2LrgqfDoCXeAGUlSur0THoeHPQNhXGjoM2bWBz0CVXfy9r5+LLFzw2fMmJLx/YvLmbgPd3+v292N67Y6wNlk2jQpBJ7zD8ca/zDomGlX2HsoQOQ0tsAhqwDVnbvxlG8onvAO5usubE7LYoZvx1ZmzMV2HigmIAqaWXAQCrsH9uIxryA8HxRpODrQ2NOLl/i+j5lYILbY1g1fM/OZk3NuId6PjFeDuQKKy7BBqy9UviesbrV1RSEBJ5DbTAjIIMNwZuxrtzoiSWBIaMi9t/TugRVD7Dlb7FDF6xVp6xpUphd55BdjLvNELZ+FPM+XAiPxWkgUqjq60NSzRwE1o6EJrbzWRTZu+I5QaCCMvQpKoBnDkgozDgWRljdwrb2nmjDDWM8wKhSYqCWBS2K/mIn+Um8fXM5MMZsZ4qqgQMwNCcI1YcGYJzM0RwTjBgGDDOYxTCU2GhRUPYM2Gucz4/zK0J/eaL+SZkxe52xXDzyUnojHCjLwaF46Hs5LwwO5abgvNxX35KRgdbYWf6bdkZWMVVlJaiUqmS9vmS4BS9Lj1RyHt6VqlOcia0/cnBSDRfRkbkqIVtPOyxTzNzDMmR9Diw7HdQTctREhuCY8BFeHBmOuLBUfFIArA/xV86FMIyctB5d5eam+BZcQlvJsLnKVCsSxQ+FMO1fc4RcyJestmtOnLLGe8T0845CU4o97B6nXskjrKnt3lXFFxa1tKjMa5VNYiofc/fAIIWK6etkrwVF4IzRKvX4uMEJl6m5mTOOIyRf8I/B6iH4dRzmefGrPEv12R091nN59+1SvQtEa32C8HRarXosEFO9HabD/4CH08Xcr7dxVyW5O6+kFyTHzmlpUpu8yVJBvp4dwO2ElAGvp7VMZWiQwuM7KTsEmuLQSV29xQG1Xt4Lf9dsc1TWKrOixZTKfiAJLyjHfykF5A5LJBZICO6Okub1n7z5lt9HbczGMwCyjFzSWYd/HBRRE0vXzqdAY/Fo8BtrYoeCuh4JqSvNixvBR3XFlElbpeCO98WTa9nFBQVbVSY3DXILmV99tIaT0o9l+Rft/fH/mZlusiorA0zlpeCw7BY9mJuPhjCQ8mJGI+3SJuIeZfjUz/Z+Z6e+greKxVhgqM5cSNEt43tuSotQqVLfwOuR6ZPEZuTYZcCTXuSAqRF2zdC+eL2ALC8I83ot0OZbZpqWnoZpoliCU+5UxCVMBhT8wPFvmG4hqhiTTpS9jk7FomzN+0KbThc/AvS4+eNowLZlA4Q4WEH9lphdXWABiVAe9CHH/tcxI1262oyt/eCbpN5nh73H2Vr9fxUyrM2Qgo54PCFelqakccgpUhhQX/n268JUsaUVr/MxAgW64ggKBspLexU8s+c0plzC43cEdl/64DY/T4yilRyIS9/3ajbYMEdLwVnjsYCYWKMzZaM2QKg2rnbzxrcnaE2+Gxir4iafyDUMCOb9IoCDXLVDYStjcbO2iXg+XXPdSG1es4bP9SpOMDWYmWTan4wYKIiG2V2kFrrRxx68ZUkiT5ExAYSUz8HUsfdWAHIP9v+/04+mvYcjy17QkPENv4HEC4a8Ews8eCnyms2ydMMvBDY+GRaKBgJ5OSZz/sJu/Cg8kXJA6hMOewkFVon7DEreBmSG8/HAlp7x+lh6G1A1cx/QhGdmoN0JiVCZ8KTAKS5h+JCOZyhwU7LLyWZI6qzDDn67+LsM+a/xCeZzDi7V0DQyouF/S59GgIJV84nHUs5SX0nmxtSszdYD6TuoSljCD1nbtRsLOOrr5+nMl1tThOhYyAoM5m23gydDAqMSaesyn5yDPK9okhDKFgtzDbHqu4lmYSq5FoLDYxgWb6NVIPYXUS4xFMwYFY82pbMVk7ITxM3HjZEjs+duccCpdqN9u1deGTzcUVNfmtDjMEyD8YPQMrNSou8sdXBnPx+LveToCIV0t9/14FqGQpf15Q0HMid87uuNrXda4R9RNRJ/GJgx6BqL1CWl43CdYvZZ1TCXTbTJUcMqIyvDyauVBiOcg9QN7+XorY+55zEz1hso+CR/eZOkuiX8xY/dXgofOwv18QAReDT5cTyDShw/e6hzGtCf6J72NFQxheul+i/KbW1XFn0hBgZ6AMXwQCGiq9RlWjiBhTw2vQSShzl3OPgwZDsImK0/dl9yHKKuxmdfarbyd+XT/6xjzfxaXpMICYwWnnOshN1/l+chro4JYcF5HWAhQi5rbcLWMRzFZKqG8vQPxDCtkn9sIJid6RCI5d0RF9ahTAcwIFIwQEJMJYmUMhX48xX7slQFW+/lnHDyA4pY2vBufjMvp0p5h7YwzbZxViTYdUBAYrGCGvcrTS42B+L8Gz+BSOzfcGxeD5/PS8fd8HdYwZHgqO/XnDwVHV5zj7K6mnLs3KEz1XzDKNINMtWQx1peYOR9y91elm9TAv84S/D6GEDv5Po8ZcIWdK572DoZLTqEqJX/QZigwPO8frkptUQgzxjwrW9XaIB7FU94heJAZqKS1nd9V4qbtTqriUDKATLoqnslz/qGDszlJjb20IiyxdRlSkSnKaWpWIY14F/9m4SR1FZKJRZl8TksJHXHJnZnZpHZfAGXUdp7zNYYyASzN3wqPgXt+kcqM7/F34pVIqS0tD1I5KJ6SlPQ3WNmrSkCBxMMe/sobkhGTIglt5JhGsQjFDyk63LTNAdraBvWZeBd3OHgyRNCq88lzkjoNaflYzNBC7sM1r0jd71bd0CHZ5nTMoWAEghEA/XSBZHq3np4e7JYFaEjZTsZbHR2d2M1tb1cXCmrr8D3jzxWefrjA3gVnsWSTnnjSvHYhE/xEobCEGVR6Mi5nZr2RGe+sHQ74n2+tcCbduPnuPngkMQ4v5WXg5YJMrKWH8CyB8MzPGQp8Xn909cD5DIEucPHAvYEh8CgqQRcz1SEDlAXS+hGv0wMGcXlzmcHym1ohC6FIZZgkYCmNpbZcKuAkLs+lS5/D30nlmjTplbP0lFp7KZlFEpPnMvNKE5s0Dcox8ppbmNF6GHsfhDTtZXN/icPbWKLKMQtZyMj5RAInOYfsV9HeOeRuJY1KC0ACXfs4lrgCHaMk48qxZL9sAkKaUU3jebk+uRfZ11ifIG687COfq3viPuINiIci1yTHEphJeCJhj46ZuWWPPoSTY8v+RglgClta1T5GL0muV14br1e+Ey/J+IyMz1IgYYTq0XTMoaAHwgEM8Eb38Ma7mOlb29rQLH9oYyPq6xtQW1ePmpqdqKqqQUVlFaqrqlDLbWlZOQIysvBxVAzu9mGGZwK/mAn9Im9fXOzri8uYOa6QTEL3X2rlrw4OxLXMTKr1ISoUC5npbmLmWxTPzJgoTZQRuC4kEJfxGOczNLnOwwf3xcbghWwd3ijKxuu0l/Mz8UJ+hoLCcwwb1tCkgvGpnFQ8QThIReNfCIZHCIYHM5NwH+FwD+Egy3P9mWC4g7aKYBBPRCbglA5TS7QxuI1guJVgkOuQNRSkqVSu7cbYcCwkGGTaM7nm+QoMIQRbsJro5BqC4Wpe81zen4zXuIr3KhOsqtYHguFPhOJlBMOltEu8vNVwaNVHwZOf8T5v4rN6M1qDgLwCNOxiImlvR6cAmJmxj5lnHxO1gGE6vQWLjm8dUyhIQpMEJwlPgCAeQQupJyCorqlBeUUlSkrLUFRcgoKCIuQx4ebk5iErOwcZmVnQEQjZtCxdBtLTdQhJ0mJrdCw+DY/E2uAQ3BMQgNv8A3ATM8kCZpiFwfQQQoKwICwYtzBzLYkOw4q4SKyIicAdUeG4KzwcD0dFYU1SAt6iR/BucS7eLcrBPwqy8Rrfv0J7KVeHF2hrc9LxXHYa1tCezkrFUwTBE5laPEYYPJpBT0FHT4Fewn3pibg3PQF3p8XjrlQN7qTdnhKHlSn0SAiDZYTB0iR6C9J5il7CbQTCrXERuIVAuJnQWsRrvElmTOb13kgYLCAM5PrlPq4nDObTS5gX5I9reX/XBPjiasJgLoE4h17CVfSUZtNLuJpAmE84LPD2wSpfP/wtJAzfxMXDO02HTD7XSsK1RsG2GrX0wnYRDm0s1bpZ2vT396twTv4rCxhOTM0IFPbSdevt7UV7ewcaG5tUwqysrFaeQBHd2fz8Qj0MsgQG2QRABlKZoFNS0pCsTUVScoreErVITkxGMuEQn5CEOFp4fCK8mQFcaQ406xgNtsdqYKvhe5ojf++cmAKnJJo2Bc48ph2PaUPbTttKs+KxN/OYG2j/4TG/TdDiXwnJ+Jr7fkX7gvY57VN+9zHtI373keH1J7RP45PwGa/jC9qXCQlYp0nAem7/lZDIYyXi+8QkfM/f/UjbwM838HuxjRoNNsbReL1buN3K693Ge9jG19vFYuOwQywmDtbc2ijTqK0tv7eLjaVp4M7zBvHaNbw3gWc2n2Fedi4KcvP5bAtQWFiMkpJSlJdXKI+svmGXgrPRW5AwwgKFE1fHHgqG+oQ+xomSCNsYOkhJVVtXR29hpwoXBA7FTLRFRcUoLChWkMjNy0cuQZHNxC2g0NFzSKfXkK7LRCo9hxSCQ8sMoOU2JT1TbbXcJtOSaAm0uFQdYmjRqRmIokWmZSAiLRPhtFBaCH8TxG0AzZfmRXPn71xTMggQHRy4teN7G5o1bfugZartDpp8J79x4GdO/L0zzY3mxfe+aVkISM9CEC0kPRuh3IbTImiRPFc0LYYWy/3jCMF4Xl8CLUnuhfepv7cMpPF1uo6eE7cZfAaZ4kHxmYjlEKRiuTl5yBMI0NuS51dQWKQ8MPHEygiDKnoJNTtrFRCampvR3tGBHsazA4w5zU3Ca9GJoxmpaBQoSAghpZJUMHZ2diqvQUqr5pYWNDU1K1BIWFFXV688CSnRxKqra1DJBC0mABErr6hCGUOP0nK9ldCKaUVM/EXcFtLyyyqU5dJyxPhZFrdZ/E0mLYPvdbR0WhotpawSSaUVSKBpaHElFYihRfN1JC2CFm6wMIPJa/k8ihbN38bSZN94bpNKK5HMY6bKOXi9ci4xOW+mXIfB5LpyuE8ef5tPK+D7QrkP3p/cj9yX3J+Y3GsZjyX3r55FVRWq+HzEBLA1NbXq2UkdjTzL+oYG9VzFO5Nn3drapip0pV6nt3cPQwdZw0O/wrgFCCeuZgQKkugkjJAEKC0QUukonoPUM0jilNCiW7VGdCvrMrZKMPGqlglCRBJzO62NMJFSTratbQRLeztaBTDctnArM07LVPQyA3UjbRczQsOgtaOBn9UbrM5gtfyuRlk7qmmVLW20dlTQymll/KxUjK+VmbwuM3wvv5Pf6/dt43H0x9tJk+Mbz6XOzc/UtahroufEz+Q65XrluuX65T7kflq4lftrlS1N7ruN9yomz0GeiTwfyejy3KRFx/gcu2WiXXoD8ozlWcszlzoE+Q/kv5Cp9oyVjBYonLg65lAwlcBBDwjDgrY0cV2N/RZkq1a/NngWpiYJWeomBCgyeWw/3d5+vpYmTv1rg8l3NFnIpk9aPPj9Hr7WG98Ps16D9UhzGX/TLU1CtC5mHunHrt/qrdOMHf5efqv/vRyjR47J4xmPL2bu/IPXxn3013z4HobcF79X98vXA3tp3OqfyV7D8zF9XoZVxA3P1Gj6Z65/9ocOHZ6N2wKEE1szCoXhMpZQYkZgjM9kv8P7Sv3FSCbtuNKxxazxGAeYWaTdWAawiKnXzDzS7j02k9/qh3Eb9xeTYysznEuuw3gtaqt+M7KNdK/jMdPnbJFFw3VcQWGyMk3sU5Xg5ShGk0w7/BwjmTGzm+4/FRp+Hossmmr9oqBgkUUWTV4WKFhkkUVDZIGCRRZZNEQWKFhkkUVDZIGCRRZZZCLg/wOcT2RJ/kcc6AAAAABJRU5ErkJggg=="
        )
    )
    .append(
      a("<button>")
        .css({
          "background-color": "#65AB31",
          border: "none",
          "border-radius": "0.25em",
          color: "#FFFFFF",
          display: "block",
          "line-height": "3em",
          margin: "0 auto",
          "margin-top": "1em",
          "min-width": "8.25em",
          outline: "none",
          padding: "0px 0.5em",
          "text-align": "center",
        })
        .addClass("csi-plugins-information-dialog-button")
        .html("CLOSE")
        .on("click", function () {
          dialog.hide();
        })
    );
  a("body").append(dialog.append(content.append(div2)));
}
