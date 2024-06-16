const addDietRecord = (record) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:8080/api/diet/records',
      method: 'POST',
      data: {
        date: record.date,
        meal: record.meal,
        foodname: record.foodname,
        foodquantity: record.foodquantity,
        calorieIntake: record.calorieIntake,
        totalCalories: record.totalCalories
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve(res);
        } else {
          reject(new Error('添加失败'));
        }
      },
      fail: () => {
        reject(new Error('网络请求失败'));
      }
    });
  });
};

const updateDietRecord = (id, record) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://localhost:8080/api/diet/records/${id}`,
      method: 'PUT',
      data: record,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(new Error('修改失败'));
        }
      },
      fail: () => {
        reject(new Error('网络请求失败'));
      }
    });
  });
};

const deleteDietRecord = (id) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://localhost:8080/api/diet/records/${id}`,
      method: 'DELETE',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.statusCode === 200 || res.statusCode === 204) {
          resolve(res);
        } else {
          reject(new Error('删除失败'));
        }
      },
      fail: () => {
        reject(new Error('网络请求失败'));
      }
    });
  });
};

module.exports = { addDietRecord, updateDietRecord, deleteDietRecord };
