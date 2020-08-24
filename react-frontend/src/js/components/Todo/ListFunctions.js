import axios from "axios";

export const getList = (id) => {
  
  return axios
    .get(`todo/tasks/${id}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      var data = [];
      console.log(res);
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key];
        data.push([val.docType, val.docPackageId]);
      });
      return data;
    })
    .catch((res) => {
      console.log(res);
    });
};

export const doneList = (id) => {
  
  return axios
    .get(`done/task/${id}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      var data = [];
      console.log(res);
      Object.keys(res.data).forEach((key) => {
        var val = res.data[key];
        data.push([val.docType, val.docPackageId, val.docLink]);
      });
      return data;
    })
    .catch((res) => {
      console.log(res);
    });
};

export const addToList = (term) => {
  return axios
    .post(
      "todo/task",
      {
        title: term,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

export const deleteItem = (term) => {
  axios
    .put(`todo/task/${term}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};

export const updateItem = (url, id, doctype) => {
  return axios
    .put(
      `todo/tasks/${id}`,
      {
        Link: url,
        type: doctype,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });
};
