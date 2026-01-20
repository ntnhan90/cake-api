import { Injectable } from "@nestjs/common";
import { InjectRepository ,} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { HTTPMethod } from "@/constants/role.constant";
// src/permissions/permission-sync.service.ts
@Injectable()
export class PermissionSyncService {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly repo: Repository<PermissionEntity>,
    ) {}

    async sync(permissionStrings: readonly string[]) {
        for (const perm of permissionStrings) {
            const [module, action] = perm.split('.');

            const existed = await this.repo.findOne({
                where: { name: perm },
            });

            if (!existed) {
                await this.repo.save(
                this.repo.create({
                    name: perm,
                    description: `${module} ${action}`,
                    module,
                    path: this.mapPath(module, action),
                    method: this.mapMethod(action),
                }),
                );
            }
        }
    }

    private mapMethod(action: string): HTTPMethod {
        return {
            view: HTTPMethod.GET,
            export: HTTPMethod.GET,
            create: HTTPMethod.POST,
            update: HTTPMethod.PUT,
            delete: HTTPMethod.DELETE,
        }[action] ?? HTTPMethod.GET;
    }

    private mapPath(module: string, action: string): string {
        return {
            view: `/${module}`,
            export: `/${module}/export`,
            create: `/${module}`,
            update: `/${module}/:id`,
            delete: `/${module}/:id`,
        }[action] ?? `/${module}`;
    }
}
