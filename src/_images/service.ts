import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image';
import * as I from './dto.in.service';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image.name) private imagesModel: Model<Image>) {}

  async createImage(createImageDto: I.IMovieIdDto): Promise<ImageDocument> {
    const newImage = new this.imagesModel(createImageDto);
    newImage.link = `/static/${newImage._id.toString()}.jpeg`;
    return await newImage.save();
  }

  async getImageById(getImageByIdDto: I.IIdDto): Promise<ImageDocument | null> {
    const existingImage = await this.imagesModel.findById(getImageByIdDto.id);
    return existingImage;
  }

  async getImagesByMovieId(
    getImagesByMovieIdDto: I.IMovieIdDto,
  ): Promise<ImageDocument[]> {
    const images = await this.imagesModel.find(getImagesByMovieIdDto);
    return images;
  }

  async deleteImageById(
    getImageByIdDto: I.IIdDto,
  ): Promise<ImageDocument | null> {
    const deletedImage = await this.imagesModel.findByIdAndDelete(
      getImageByIdDto.id,
    );
    return deletedImage;
  }
}
