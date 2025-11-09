import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const router = Router();
const specPath = path.join(process.cwd(), 'src', 'docs', 'openapi.yaml');
const swaggerDocument = YAML.load(specPath);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  customSiteTitle: 'Food Delivery API Docs',
}));

export default router;
