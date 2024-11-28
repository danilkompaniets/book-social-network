package com.danilkompaniets.book_network.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateName emailTemplate,
            String confirmation,
            String activationCode,
            String subject) throws MessagingException {

        // Determine the template name
        String templateName = (emailTemplate == null)
                ? "confirm-email"
                : emailTemplate.name().toLowerCase();

        // Prepare the email content
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmation);
        properties.put("activation_code", activationCode);

        Context context = new Context();
        context.setVariables(properties);

        // Create and send email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        mimeMessageHelper.setFrom("kompnaiets1592925@gmail.com");
        mimeMessageHelper.setTo(to); // Fix: Correct recipient setup
        mimeMessageHelper.setSubject(subject);

        String processedTemplate = templateEngine.process(templateName, context);
        mimeMessageHelper.setText(processedTemplate, true);

        // Send the email
        mailSender.send(mimeMessage);
        log.info("Email sent successfully to {}", to);
    }
}