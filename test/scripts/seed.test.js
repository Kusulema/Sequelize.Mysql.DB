const sequelize = require('../../db/connections');
const Phone = require('../../db/models/phone');
const seed = require('../../../scripts/seed'); // Assuming seed is exported or can be called

jest.mock('../../db/connections');
jest.mock('../../db/models/phone');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


describe('Seed Script', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        sequelize.sync.mockResolvedValue();
        Phone.bulkCreate.mockResolvedValue();
    });

    afterAll(() => {
        mockExit.mockRestore();
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('should successfully sync database and bulk create data', async () => {
        await seed();

        expect(sequelize.sync).toHaveBeenCalledWith({ force: true });
        expect(Phone.bulkCreate).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith('Таблицы в MySQL успешно пересозданы.');
        expect(consoleLogSpy).toHaveBeenCalledWith('Тестовые данные успешно загружены.');
        expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should exit with error if sync fails', async () => {
        sequelize.sync.mockRejectedValue(new Error('Sync failed'));

        await seed();

        expect(sequelize.sync).toHaveBeenCalledWith({ force: true });
        expect(Phone.bulkCreate).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Ошибка при сидировании базы данных:', expect.any(Error));
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should exit with error if bulkCreate fails', async () => {
        Phone.bulkCreate.mockRejectedValue(new Error('Bulk create failed'));

        await seed();

        expect(sequelize.sync).toHaveBeenCalledWith({ force: true });
        expect(Phone.bulkCreate).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Ошибка при сидировании базы данных:', expect.any(Error));
        expect(mockExit).toHaveBeenCalledWith(1);
    });
});
