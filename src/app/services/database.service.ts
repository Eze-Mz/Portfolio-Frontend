import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import IExperience from '../Models/experience.model';
import IEducation from '../Models/education.model';
import IProyect from '../Models/proyect.model';
import ISkill from '../Models/skill.model';
import { AuthUserService } from './auth-user.service';
import IUser from '../Models/user.model';
import IPortfolio from '../Models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  userId!: number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //user endpoints
  getUserId() {
    this.userId = this.user.getUserId();
    return this.userId;
  }

  constructor(private http: HttpClient, private user: AuthUserService) {}
  //genericUrl = 'http://localhost:3000/';

  getUserData(email: string): Observable<any> {
    const url = `https://warm-gorge-04744.herokuapp.com/user/${email}`;
    return this.http.get(url);
  }

  getUsersList(): Observable<IPortfolio[]> {
    const url = `https://warm-gorge-04744.herokuapp.com/user/list`;
    return this.http.get<IPortfolio[]>(url);
  }

  updateUserData(data: IUser): Observable<any> {
    const url = `https://warm-gorge-04744.herokuapp.com/user/${this.getUserId()}`;
    return this.http.put(url, data, this.httpOptions);
  }

  deleteUser(): Observable<any> {
    const url = `https://warm-gorge-04744.herokuapp.com/user/${this.getUserId()}`;
    return this.http.delete(url);
  }

  userExistsByEmail(email: string) {
    const url = `https://warm-gorge-04744.herokuapp.com/user/exists/${email}`;
    return this.http.get(url);
  }

  // Manage portfolio data
  getData(
    dataId: string,
    portfolioEmail: string
  ): Observable<(IExperience & IEducation & IProyect & ISkill)[]> {
    const url = `https://warm-gorge-04744.herokuapp.com/data/${portfolioEmail}/${dataId}`;
    return this.http.get<(IExperience & IEducation & IProyect & ISkill)[]>(url);
  }

  addData(
    dataId: string,
    data: IExperience | IEducation | IProyect | ISkill
  ): Observable<IExperience & IEducation & IProyect & ISkill> {
    const url = `https://warm-gorge-04744.herokuapp.com/data/${this.getUserId()}/${dataId}`;
    return this.http.post<IExperience & IEducation & IProyect & ISkill>(
      url,
      data,
      this.httpOptions
    );
  }

  deleteData(
    dataId: string,
    data: IExperience | IEducation | IProyect | ISkill
  ): Observable<any> {
    const url = `https://warm-gorge-04744.herokuapp.com/data/${dataId}/`;
    if (dataId === 'experiences') {
      let experience = data as IExperience;
      return this.http.delete(url + experience.id_exp);
    }
    if (dataId === 'education') {
      let education = data as IEducation;
      return this.http.delete(url + education.id_ed);
    }
    if (dataId === 'proyects') {
      let proyect = data as IProyect;
      return this.http.delete(url + proyect.id_proyecto);
    }
    if (dataId === 'skills') {
      let skill = data as ISkill;
      return this.http.delete(url + skill.id_skill);
    }
    throw console.error('El dataId es erróneo');
  }

  updateData(
    dataId: string,
    data: IExperience | IEducation | IProyect | ISkill
  ): Observable<IExperience | IEducation | IProyect | ISkill> {
    const url = `https://warm-gorge-04744.herokuapp.com/data/${this.getUserId()}/${dataId}/`;
    if (dataId === 'experiences') {
      let experience = data as IExperience;
      return this.http.put<IExperience>(
        url + experience.id_exp,
        data,
        this.httpOptions
      );
    }
    if (dataId === 'education') {
      let education = data as IEducation;
      return this.http.put<IEducation>(
        url + education.id_ed,
        data,
        this.httpOptions
      );
    }
    if (dataId === 'proyects') {
      let proyect = data as IProyect;
      return this.http.put<IProyect>(
        url + proyect.id_proyecto,
        data,
        this.httpOptions
      );
    }
    if (dataId === 'skills') {
      let skill = data as ISkill;
      return this.http.put<IProyect>(
        url + skill.id_skill,
        data,
        this.httpOptions
      );
    }

    throw console.error('El dataId es erróneo');
  }
}
