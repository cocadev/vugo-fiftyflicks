import ApiHelper from "./ApiHelper";

function getLayoutHome() {
  return ApiHelper({
    url: "/layout/home",
    method: "GET",
  });
}

function getLayoutFiftyFlicks() {
  return ApiHelper({
    url: "/layout/fiftyflicks",
    method: "GET",
  });
}

function getRail(railId) {
  return ApiHelper({
    url: `/layout/rails/${railId}`,
    method: "GET",
  });
}

const LayoutApi = {
  getLayoutHome,
  getLayoutFiftyFlicks,
  getRail,
};

export default LayoutApi;
