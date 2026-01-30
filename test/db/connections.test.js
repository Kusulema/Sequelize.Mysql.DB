const sequelize = require('../../db/connections');

// Mock process.exit to prevent it from terminating the test runner
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Database Connection', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should authenticate successfully', async () => {
        sequelize.authenticate.mockResolvedValueOnce(); // Mock a successful connection
        require('../../db/connections'); // Re-require to run checkConnection

        // Give some time for the async function to complete
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
        expect(mockExit).not.toHaveBeenCalled();
    });

    it('should exit process if authentication fails', async () => {
        sequelize.authenticate.mockRejectedValueOnce(new Error('Connection failed')); // Mock a failed connection
        
        // Temporarily suppress console.error for this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        require('../../db/connections'); // Re-require to run checkConnection

        // Give some time for the async function to complete
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledWith(1);
        consoleErrorSpy.mockRestore(); // Restore console.error
    });
});
