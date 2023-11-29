import {
  getSimList,
  setSimCount,
  setSimLoading,
  setSimPage,
} from "@/GlobalRedux/Sim/SimSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { getAllSim } from "../api/simApi";
import { errorToast } from "@/app/components/modals/CustomToast";
import { simPageSize } from "@/constants/constants";

export const getSimFunction = (
  dispatch: Dispatch<AnyAction>,
  page: number,
  type: any,
  telco: string | undefined,
  isNew: boolean,
  search?: string,
  not_include?: string[],
) => {
  console.log("page", page);

  dispatch(setSimLoading(true));
  getAllSim({
    skip: (page - 1) * 10,
    limit: simPageSize,
    type,
    telco,
    search,
    not_include,
  })
    .then((v) => {
      if (isNew) {
        dispatch(setSimPage(1));
      }
      dispatch(getSimList(v["list"]));
      dispatch(setSimCount(v["count"]));
      dispatch(setSimLoading(false));
    })
    .catch((err) => {
      dispatch(setSimLoading(false));
      errorToast("Lỗi", err);
    });
};
