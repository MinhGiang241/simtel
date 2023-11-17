import { setPath } from "@/GlobalRedux/path/pathSlice"
import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const pushPathName = (router: AppRouterInstance, dispatch: Dispatch<AnyAction>, path: string) => {

  router.push(`${path}/`)
  dispatch(setPath(`${path}/`))
}
