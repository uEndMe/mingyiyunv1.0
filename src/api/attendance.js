import request from "../utils/request";

// 考勤报表分页列表
export const reportpage = query => {
  return request({
    url: "/attendance/clockin/reportpage",
    data: query || {},
    method: "get"
  });
};
// 班次分页列表
export const workpage = query => {
  return request({
    url: "/workshif/page",
    data: query || {},
    method: "get"
  });
};
