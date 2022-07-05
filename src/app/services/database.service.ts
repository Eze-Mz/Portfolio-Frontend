import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import IExperience from '../Models/experience.model';
import IEducation from '../Models/education.model';
import IProyect from '../Models/proyect.model';
import ISkill from '../Models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  genericUrl = 'http://localhost:3000/';

  getData(
    dataId: string
  ): Observable<(IExperience & IEducation & IProyect & ISkill)[]> {
    const url = this.genericUrl + dataId;
    return this.http.get<(IExperience & IEducation & IProyect & ISkill)[]>(url);
  }

  addData(dataId: string, data: IExperience): Observable<IExperience> {
    const url = this.genericUrl + dataId;
    return this.http.post<IExperience>(url, data, this.httpOptions);
  }

  deleteData(dataId: string, data: IExperience): Observable<IExperience> {
    const url = `${this.genericUrl}${dataId}/${data.id}`;
    return this.http.delete<IExperience>(url);
  }

  updateData(dataId: string, data: IExperience): Observable<IExperience> {
    const url = `${this.genericUrl}${dataId}/${data.id}`;
    return this.http.put<IExperience>(url, data, this.httpOptions);
  }
}
