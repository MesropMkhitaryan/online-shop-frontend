import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): string | any {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationTime = decodedToken.exp * 1000 + 5000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Assuming it's a JWT
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
