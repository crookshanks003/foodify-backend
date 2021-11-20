import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";
require("dotenv").config();

@Injectable()
export class FileService {
	async uploadFile(image: Express.Multer.File) {
		const storage = new Storage();
		const bucket = storage.bucket(process.env.GCP_BUCKET);
		const blob = bucket.file(image.originalname);
		const blobStream = blob.createWriteStream();

		blobStream.on("error", (err) => {
			console.log(err)
			throw new InternalServerErrorException(["Image upload failed"]);
		});
		blobStream.end(image.buffer);
		return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
	}
}
