export class Commands {
    user: any
    constructor(user: any) {

    }

    private elements: any = {
        loginButton: `a[href$='login']`,
        loginField: `input[name$="username"]`,
        pswrdField: `input[name$="password"]`,
        submitButton: `input[name$="submit"]`,
        logoutButton: `a[href$='logout']`,
    }

    public login() {
        cy.get(this.elements.loginButton).click()
            .get(this.elements.loginField).type(this.user.email)
            .get(this.elements.pswrdField).type(this.user.pswrd)
            .get(this.elements.submitButton);
            return this;
    }

    public logout() {
        cy.get(this.elements.logoutButton).click();
        return this;
    }
}