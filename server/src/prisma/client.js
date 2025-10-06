/**
 * Prisma client configuration and initialization
 * Provides singleton instance of PrismaClient for database operations
 * Used throughout the application for ORM database access
 */

const {PrismaClient} = require('@prisma/client');

/**
 * Singleton Prisma client instance for database operations
 */
const prisma = new PrismaClient();

module.exports = prisma;