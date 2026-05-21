# test-interview-node-1

API REST de base en Node.js + TypeScript avec architecture en couches stricte:

- Controller: `src/controllers/UserController.ts`
- Service: `src/services/UserService.ts`
- Repository: `src/repositories/UserRepository.ts`
- Middleware global d'erreur: `src/middlewares/ErrorHandler.ts`

## Scripts

- `npm run dev`: lance l'API en mode développement
- `npm run build`: compile TypeScript
- `npm run test`: exécute les tests Vitest

## Route d'exemple

- `GET /users/:id`
