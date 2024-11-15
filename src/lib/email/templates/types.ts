export interface TemplateData {
    [key: string]: string | number | boolean;
  }
  
  export interface EmailTemplate {
    subject: string;
    template: (data: TemplateData) => string;
  }