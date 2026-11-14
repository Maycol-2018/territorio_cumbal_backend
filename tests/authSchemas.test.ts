import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from '../src/schemas/authSchemas';

describe('schemas de autenticación', () => {
  it('normaliza username a minúsculas', () => {
    const result = registerSchema.parse({ nombres: 'Juan', apellidos: 'Pérez', username: 'Juan_123', celular: '3001234567', vereda: 'Tasmag', password: 'Password123!' });
    expect(result.username).toBe('juan_123');
  });
  it('rechaza passwords cortos', () => {
    expect(() => loginSchema.parse({ username: 'juan123', password: '' })).toThrow();
  });
});
