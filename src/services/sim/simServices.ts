import {
  getSimList,
  setSimCount,
  setSimLoading,
  setSimPage,
} from "@/GlobalRedux/Sim/SimSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { getAllSim } from "../api/simApi";
import { errorToast } from "@/app/components/modals/CustomToast";

export const getSimFunction = (
  dispatch: Dispatch<AnyAction>,
  page: number,
  type: any,
  telco: string | undefined,
  isNew: boolean,
) => {
  console.log("page", page);

  dispatch(setSimLoading(true));
  getAllSim({ skip: (page - 1) * 10, limit: 10, type, telco })
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
