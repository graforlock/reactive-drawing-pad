import * as io from 'socket.io-client';

class Sockets<T>
{
    private readonly server: string;
    private readonly io : SocketIOClient.Socket;

    constructor(server: string)
    {
        this.server = server;
        this.io = io.connect(server);
    }

    public emit(event: string, payload: T): void
    {
        this.io.emit(event, payload);
    }
}

export default Sockets;