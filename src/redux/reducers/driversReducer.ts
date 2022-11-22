import {drivers} from '../breakpoints';

const initialState = {
  data: [],
  loading: true,
  errorStatus: false,
  errorText: '',
  footerLoading: false,
};

export const driversReducer = (state = initialState, action) => {
  switch (action.type) {
    case drivers.GET_DRIVERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        errorStatus: false,
        footerLoading: false,
      };
    case drivers.GET_DRIVERS_SCROLLING:
      console.log('action payload', state?.data.offset, action.payload.offset);
      return {
        ...state,
        data: {
          ...state.data,
          DriverTable: {
            Drivers: [...state?.data?.DriverTable?.Drivers, ...action.payload.data],
          },
          offset: action.payload.offset,
        },
        footerLoading: false,
      };
    case drivers.FOOTER_LOADING:
      return {
        ...state,
        footerLoading: action.payload,
      };
    case drivers.LOADING_DRIVERS:
      return {
        ...state,
        loading: action.payload,
      };
    case drivers.ERROR_DRIVERS:
      return {
        ...state,
        errorStatus: action.payload.errorStatus,
        errorText: action.payload.errorText,
        loading: false,
      };
    default:
      return state;
  }
};

export const driversDispatch = (data = []) => ({
  type: drivers.GET_DRIVERS,
  payload: data,
});

export const infiniteScrollDispatch = (data = [], offset: number) => ({
  type: drivers.GET_DRIVERS_SCROLLING,
  payload: {data, offset},
});

export const footerLoadingDispatch = (loading: boolean) => ({
  type: drivers.FOOTER_LOADING,
  payload: loading,
});

export const loadingDispatch = (loading: boolean = false) => ({
  type: drivers.GET_DRIVERS,
  payload: loading,
});

export const errorDispatch = (
  errorStatus: boolean = false,
  errorText: string = '',
) => ({
  type: drivers.ERROR_DRIVERS,
  payload: {errorStatus, errorText},
});
