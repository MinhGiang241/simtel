import { Button } from "antd";
import toast from "react-hot-toast";
import {
  CheckCircleOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";

export const successToast = (title: string, content: string,) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 justify-center`}
    >
      <div className="px-10 relative">
        <div className="flex justify-center mt-6 mb-4">
          <CheckCircleFilled className="text-7xl text-green-600" />
        </div>
        <div className="flex flex-col text-center">
          <h4 className="text-base font-bold mb-2">{title}</h4>
          <p>{content}</p>
        </div>
        <div className="flex justify-center my-6">
          <Button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="border-m_red h-12 w-[115px] text-m_red text-base font-semibold"
          >
            Đồng ý
          </Button>
        </div>
        <button
          className="absolute right-3 top-3"
          onClick={() => toast.dismiss(t.id)}
        >
          <CloseOutlined />
        </button>
      </div>

      {/* <div className="w-full flex flex-col justify-center items-center my-3 px-5 relative"> */}
      {/*   <div className="mb-3 font-bold text-xl">{title}</div> */}
      {/*   <CheckCircleOutlined */}
      {/*     className="text-5xl mb-3" */}
      {/*     style={{ color: "green" }} */}
      {/*   /> */}
      {/*   <div className="mb-3 text-center">{content}</div> */}
      {/*   <Button */}
      {/*     onClick={() => toast.dismiss(t.id)} */}
      {/*     className="bg-m_red border-m_red text-white rounded-xl px-6" */}
      {/*   > */}
      {/*     Đồng ý */}
      {/*   </Button> */}
      {/*   <button */}
      {/*     className="absolute right-1 -top-1" */}
      {/*     onClick={() => { */}
      {/*       toast.dismiss(t.id); */}
      {/*     }} */}
      {/*   > */}
      {/*     <CloseOutlined /> */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  ));
};

export const errorToast = (title: string, content: string) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 justify-center`}
    >
      <div className="px-10 relative">
        <div className="flex justify-center mt-6 mb-4">
          <CloseCircleFilled className="text-7xl text-m_orange" />
        </div>
        <div className="flex flex-col text-center">
          <h4 className="text-base font-bold mb-2">{title}</h4>
          <p>{content}</p>
        </div>
        <div className="flex justify-center my-6">
          <Button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="border-m_red h-12 w-[115px] text-m_red text-base font-semibold"
          >
            Đồng ý
          </Button>
        </div>
        <button
          className="absolute right-3 top-3"
          onClick={() => toast.dismiss(t.id)}
        >
          <CloseOutlined />
        </button>
      </div>

      {/* <div className="w-full flex flex-col justify-center items-center my-3 px-5 relative"> */}
      {/*   <div className="mb-3 font-bold text-xl text-center">{title}</div> */}
      {/*   <CloseCircleOutlined */}
      {/*     className="text-5xl mb-3" */}
      {/*     style={{ color: "red" }} */}
      {/*   /> */}
      {/*   <div className="mb-3 text-center">{content}</div> */}
      {/*   <Button */}
      {/*     onClick={() => toast.dismiss(t.id)} */}
      {/*     className="bg-m_red border-m_red text-white rounded-xl px-6" */}
      {/*   > */}
      {/*     Đồng ý */}
      {/*   </Button> */}
      {/*   <button */}
      {/*     className="absolute right-1 -top-1" */}
      {/*     onClick={() => toast.dismiss(t.id)} */}
      {/*   > */}
      {/*     <CloseOutlined /> */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  ));
};
