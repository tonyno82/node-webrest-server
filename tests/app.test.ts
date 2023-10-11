import { Server } from "../src/presentation/server"
import { envs } from '../src/config/envs';

jest.mock( "../src/presentation/server")


describe('Testing app.ts', () => { 
    
    test('should work', async() => { 

        await import('../src/app')

        expect(Server).toHaveBeenCalledTimes(1)
        expect(Server).toBeCalledWith({
            "port": envs.PORT,
            "public_path": envs.PUBLIC_PATH,
            "routes": expect.any(Function),
        })

        expect(Server.prototype.start).toHaveBeenCalledWith()
        

     })

 })