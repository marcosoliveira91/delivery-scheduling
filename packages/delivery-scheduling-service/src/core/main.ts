import config from '../config';
import { ApiDocsGeneratorPlugin } from './bootstrap/api-docs-generator.plugin';
import { ApiHealthCheckPlugin } from './bootstrap/api-health-check.plugin';
import { CorsPlugin } from './bootstrap/cors.plugin';
import { DI } from './bootstrap/di';
import { Hooks } from './bootstrap/hooks';
import { IConfig } from '../config/config.interface';
import { IocContainer } from './ioc/container';
import { Routes } from './bootstrap/routes';
import { Server } from './server';
import 'reflect-metadata';

const configuration: IConfig = config.get();
const iocContainer: IocContainer = new IocContainer();
const server: Server = new Server();

/* Bootstrap IoC Container */
DI.bootstrap(iocContainer);

/* Bootstrap Server */
ApiDocsGeneratorPlugin.bootstrap(server, configuration.env !== 'production');
ApiHealthCheckPlugin.bootstrap(server);
CorsPlugin.bootstrap(server);
Routes.bootstrap(server, iocContainer);
Hooks.bootstrap(server);

/* Init Server */
server.init(configuration.port);
