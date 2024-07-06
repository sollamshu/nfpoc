export class DemoQaRequests {
    async login(request: any): Promise<any> {
        return await request.post(`${process.env.API_URL}/Account/v1/Login`, {
            data: {
                userName: process.env.USER,
                password: process.env.PASS
            }
        });
    }

    async getBooks(request: any): Promise<any> {
        return await request.get(`${process.env.API_URL}/BookStore/v1/Books`);
    }
}
  
export default new DemoQaRequests()