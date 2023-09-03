import { Injectable } from '@nestjs/common';
import HttpClient, { GetParams } from './http-client';
import axios from 'axios';

@Injectable()
export default class AxiosAdapter implements HttpClient {
  async get<T = any>(url: string, params: GetParams): Promise<T> {
    const res = await axios.get(url, { params });
    return res.data;
  }
}
