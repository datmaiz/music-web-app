import {NotFoundImage} from "@/assets/images";
import {Link} from "react-router-dom";

export const NotFoundPage = () => {
  return <div className={'w-full h-dvh relative'}>
    <img
      src={NotFoundImage}
      alt="Not found"
      className={'w-full h-full max-h-full max-w-full object-contain'}
    />

    <button
      type={'button'}
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 duration-300 border border-[#fff0] hover:border-[#999] rounded-lg`}
    >
      <Link to={'/dashboard'} className={`block px-6 py-2`}>Back to home page</Link>
    </button>
  </div>
}
