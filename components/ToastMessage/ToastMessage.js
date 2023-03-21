"use client";

import { useEffect, useState } from "react";
import style from "./toastMessage.module.scss";

const ToastMessage = ({ toastList = [], autoDeleteTime, autoDelete }) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  return (
    <>
      <div className={`${style.notification_container} ${style.top_right}`}>
        {list.map((toast, index) => (
          <div
            style={{ background: toast.backgroundColor }}
            key={index}
            className={`${style.notification} ${style.toast} ${style.top_right}`}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>

            {toast.icon && (
              <div className={`${style.notification_image}`}>
                <img src={toast.icon} alt="" />
              </div>
            )}
            <div>
              <p className={`${style.notification_title}`}>{toast.title}</p>
              <p className={`${style.notification_message}`}>
                {toast.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToastMessage;
