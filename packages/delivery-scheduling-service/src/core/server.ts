import Logger from '../shared/logger/logger';
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyError,
  FastifyRegisterOptions,
  FastifyPluginOptions,
  FastifyPluginCallback,
  onRequestHookHandler,
  RouteShorthandOptions,
  RouteHandler,
} from 'fastify';

type Verb = 'get' | 'post' | 'put' | 'patch';
type HookHandler = onRequestHookHandler;
type HookErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply<any>,
) => void;

export class Server {
  private readonly instance: FastifyInstance;

  constructor() {
    this.instance = fastify();
  }

  init(port = 0): void {
    void this.instance.listen(port, '::')
      .then((address: string) => this.instance.log.info(`Server listening on ${address}`))
      .catch((error: Error) => {
        Logger.getInstance().error({
          message: 'Error in Server.init',
          data: {},
          error,
        });

        process.exit(1);
      });
  }

  setRoute<T>(verb: Verb, route: string, handler: RouteHandler<T>, opts?: RouteShorthandOptions): void {
    if (!opts) {
      this.instance[verb]<T>(route, handler);
      return;
    }

    this.instance[verb]<T>(route, opts, handler);
  }

  use(plugin: FastifyPluginCallback, opts?: FastifyRegisterOptions<FastifyPluginOptions>): void {
    void this.instance.register(plugin, opts);
  }

  addOnRequestHook(handler: HookHandler): void {
    this.instance.addHook('preHandler', handler);
  }

  addOnErrorHook(handler: HookErrorHandler): void {
    this.instance.setErrorHandler(handler);
  }
}
