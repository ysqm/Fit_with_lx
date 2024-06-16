const { addDietRecord, updateDietRecord, deleteDietRecord } = require('../dietService');
// 创建一个模拟的 wx 对象
global.wx = {
	redirectTo: jest.fn(),
	request: jest.fn(),
};

describe('Diet Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a diet record successfully (apple)', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 201 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'breakfast',
      foodname: '苹果',
      foodquantity: 1,
      calorieIntake: 52,
      totalCalories: 52
    };

    await expect(addDietRecord(record)).resolves.toEqual({ statusCode: 201 });
  });

  test('should add a diet record successfully (bread)', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 201 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'lunch',
      foodname: '面包',
      foodquantity: 2,
      calorieIntake: 150,
      totalCalories: 300
    };

    await expect(addDietRecord(record)).resolves.toEqual({ statusCode: 201 });
  });

  test('should update a diet record successfully (change foodname)', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 200 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'breakfast',
      foodname: '牛奶',
      foodquantity: 1,
      calorieIntake: 42,
      totalCalories: 42
    };

    await expect(updateDietRecord(1, record)).resolves.toEqual({ statusCode: 200 });
  });

  test('should update a diet record successfully (change foodquantity)', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 200 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'breakfast',
      foodname: '牛奶',
      foodquantity: 2,
      calorieIntake: 84,
      totalCalories: 84
    };

    await expect(updateDietRecord(1, record)).resolves.toEqual({ statusCode: 200 });
  });

  test('should delete a diet record successfully', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 204 });
    });

    await expect(deleteDietRecord(1)).resolves.toEqual({ statusCode: 204 });
  });

  test('should fail to add a diet record', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 400 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'breakfast',
      foodname: '苹果',
      foodquantity: 1,
      calorieIntake: 52,
      totalCalories: 52
    };

    await expect(addDietRecord(record)).rejects.toThrow('添加失败');
  });

  test('should fail to update a diet record', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 400 });
    });

    const record = {
      date: '2024-06-15',
      meal: 'breakfast',
      foodname: '牛奶',
      foodquantity: 2,
      calorieIntake: 84,
      totalCalories: 84
    };

    await expect(updateDietRecord(1, record)).rejects.toThrow('修改失败');
  });

  test('should fail to delete a diet record', async () => {
    wx.request.mockImplementation(({ success }) => {
      success({ statusCode: 400 });
    });

    await expect(deleteDietRecord(1)).rejects.toThrow('删除失败');
  });
});
