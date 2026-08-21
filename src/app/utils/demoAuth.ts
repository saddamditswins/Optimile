// Demo Authentication Credentials
// IMPORTANT: This is for demonstration purposes only

export interface DemoCredential {
  email: string;
  password: string;
  roleId: string;
  roleName: string;
}

export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    email: 'sadmin@gmail.com',
    password: 'SAdmin123!',
    roleId: 'super-admin',
    roleName: 'Super Admin'
  },
  {
    email: 'admin@gmail.com',
    password: 'Admin123!',
    roleId: 'tenant-admin',
    roleName: 'Tenant Admin'
  },
  {
    email: 'dm@gmail.com',
    password: 'Dm123!',
    roleId: 'dispatch-manager',
    roleName: 'Dispatch Manager'
  },
  {
    email: 'om@gmail.com',
    password: 'Om123!',
    roleId: 'operations-manager',
    roleName: 'Operations Manager'
  },
  {
    email: 'fs@gmail.com',
    password: 'Fs123!',
    roleId: 'fleet-supervisor',
    roleName: 'Fleet Supervisor'
  },
  {
    email: 'driver@gmail.com',
    password: 'D123!',
    roleId: 'driver',
    roleName: 'Driver'
  }
];

export interface AuthResult {
  success: boolean;
  roleId?: string;
  roleName?: string;
  error?: string;
}

/**
 * Validates demo credentials and returns the assigned role
 * @param email User email
 * @param password User password
 * @returns AuthResult with success status and role information
 */
export function validateDemoCredentials(email: string, password: string): AuthResult {
  const credential = DEMO_CREDENTIALS.find(
    (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
  );

  if (!credential) {
    return {
      success: false,
      error: 'Invalid demo credentials. Please use the assigned role login.'
    };
  }

  return {
    success: true,
    roleId: credential.roleId,
    roleName: credential.roleName
  };
}

/**
 * Checks if a role ID matches the authenticated user's role
 * Used for role access enforcement
 */
export function isAuthorizedForRole(authenticatedRoleId: string, requestedRoleId: string): boolean {
  return authenticatedRoleId === requestedRoleId;
}

/**
 * Gets all available demo credentials (for display/testing purposes)
 */
export function getAllDemoCredentials(): DemoCredential[] {
  return DEMO_CREDENTIALS;
}
