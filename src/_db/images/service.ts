import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './entity.image';
import * as I from './dto.in.service';

@Injectable()
export class DBImagesService {
  constructor(@InjectModel(Image.name) private imagesModel: Model<Image>) {}

  async createImage(createImageDto: I.ICreateImageDto): Promise<ImageDocument> {
    const newImage = new this.imagesModel(createImageDto);
    newImage.link = `/static/${newImage._id.toString()}.jpeg`;
    return await newImage.save();
  }

  async readImageById(idDto: I.IIdDto): Promise<ImageDocument | null> {
    const existingImage = await this.imagesModel.findById(idDto.id);
    return existingImage;
  }

  async readImages(
    readImagesFilter: I.IReadImagesFilter,
  ): Promise<ImageDocument[]> {
    const images = await this.imagesModel.find(readImagesFilter);
    return images;
  }

  async deleteImageById(
    deleteImageById: I.IIdDto,
  ): Promise<ImageDocument | null> {
    const deletedImage = await this.imagesModel.findByIdAndDelete(
      deleteImageById.id,
    );
    return deletedImage;
  }
}
