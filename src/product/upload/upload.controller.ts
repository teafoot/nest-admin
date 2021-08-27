import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const filename = `${randomName}${extname(file.originalname)}`;
          const error = null;
          return callback(error, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // {
    //   fieldname: 'image',
    //   originalname: 'chris-turgeon-yLFHRAsGYUQ-unsplash.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   destination: './uploads',
    //   filename: 'af78def3f9f76768b7390a58cc623db5.jpg',
    //   path: 'uploads/af78def3f9f76768b7390a58cc623db5.jpg',
    //   size: 2062102
    // }
    return {
      url: `http://localhost:8000/api/uploads/${file.filename}`,
    };
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: 'uploads' });
  }
}
