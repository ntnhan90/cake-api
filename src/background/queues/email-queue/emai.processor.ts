import { IEmailJob, IVerifyEmailJob } from "@/common/interfaces/job.interface";
import { JobName, QueueName } from "@/constants/job.constant";
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
