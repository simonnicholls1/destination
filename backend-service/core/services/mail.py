from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
from core.config import settings


class Emailer():

    @staticmethod
    def send_template(to, subject, template_id, template_data):

        message = Mail(from_email=settings.from_email, to_emails=[to], subject=subject)
        message.template_id = template_id
        message.dynamic_template_data = template_data

        # create our sendgrid client object, pass it our key, then send and return our response objects
        sg = SendGridAPIClient(settings.mail_api_key)
        try:
            response = sg.send(message)
            code, body, headers = response.status_code, response.body, response.headers
        except Exception as e:
            print("Error: {0}".format(e))
        return str(response.status_code)
