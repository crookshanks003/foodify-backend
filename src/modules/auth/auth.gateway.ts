import { InjectRepository } from "@nestjs/typeorm";
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { User } from "src/entities";
import { Repository } from "typeorm";

@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

	@WebSocketServer()
	server: Server;
	private connectedClients: { user: User; socket: Socket }[];

	async handleConnection(socket: Socket) {
		const { userId } = socket.handshake.headers;
		if (!userId) {
			socket.disconnect();
			return;
		}
		if (typeof userId !== "string") {
			socket.disconnect();
			return;
		}
		const user = await this.userRepo.findOne({ id: parseInt(userId) });
		if (!user) {
			socket.disconnect();
			return;
		}
		this.connectedClients.push({ socket, user });
		return "Connected";
	}

	handleDisconnect(socket: Socket) {
		for (let i = 0; i < this.connectedClients.length; i++) {
			if (this.connectedClients[i].socket === socket) {
				this.connectedClients.splice(i, 1);
				break;
			}
		}
		return "Disconnected";
	}
}
