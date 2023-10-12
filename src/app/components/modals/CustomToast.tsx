import { Button } from "antd"
import toast from "react-hot-toast"
import { CheckCircleOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons'

export const success = (title: string, content: string,) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-full flex flex-col justify-center items-center my-3 px-5 relative">
        <div className="mb-3 font-bold text-xl">
          {title}
        </div>
        <CheckCircleOutlined className='text-5xl mb-3' style={{ color: "green" }} />
        <div className="mb-3 text-center">
          {content}
        </div>
        <Button
          onClick={() => toast.dismiss(t.id)}
          className="bg-m_red border-m_red text-white rounded-xl px-6"
        >
          Đồng ý
        </Button>
        <button className="absolute right-1 -top-1" onClick={() => {
          toast.dismiss((t.id))
        }}>
          <CloseOutlined />
        </button>
      </div>
    </div>
  ))
}

export const error = (title: string, content: string) => {

  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-full flex flex-col justify-center items-center my-3 px-5 relative">
        <div className="mb-3 font-bold text-xl text-center">
          {title}
        </div>
        <CloseCircleOutlined className='text-5xl mb-3' style={{ color: "red" }} />
        <div className="mb-3 text-center">
          {content}
        </div>
        <Button
          onClick={() => toast.dismiss(t.id)}
          className="bg-m_red border-m_red text-white rounded-xl px-6"
        >
          Đồng ý
        </Button>
        <button className="absolute right-1 -top-1" onClick={() => toast.dismiss((t.id))}>
          <CloseOutlined />
        </button>
      </div>
    </div>
  ))

}
