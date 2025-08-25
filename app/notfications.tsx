"use client"
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NotificationContainer = () => {
  return (
    <ToastContainer
      toastClassName="!p-0 !m-0 !mt-[3rem]  xl:!mt-[3rem] max-[31.25rem]:!mr-0 max-[31.25rem]:!mx-[0.5rem] !mr-[1rem] xl:!mr-[3.875rem] !min-h-0 !min-w-0 !w-auto !h-auto !rounded-[0.525rem] shadow-none text-black"
      className="!m-0 !h-auto !min-h-0 !w-auto pointer-events-none !min-w-0 !rounded-[0.525rem] !p-0 shadow-none"
      closeButton={false}
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      limit={1}
      transition={Slide}
    />
  );
};

export default NotificationContainer;
