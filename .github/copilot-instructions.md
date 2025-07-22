# GitHub Copilot Instructions for Guided Engineering

This repository follows the **Guided Engineering** methodology - a structured, traceable, and executable system for managing software development through modular prompts, personas, and reproducible documentation.

## Core Principles

- **Everything is a prompt**: All tasks are defined as executable, versioned YAML prompts
- **Small steps**: Each prompt performs one clear task with observable outputs
- **Personas over roles**: Every prompt is assigned to a specialized persona (SystemIntegrator, SoftwareDeveloper, CodeAuditor, etc.)
- **Traceable outputs**: All actions generate files in `.guides/` for full audit trail
- **Human-led by design**: AI assists but humans provide direction and judgment

## Project Structure Guidelines

### Documentation & Specifications

- **All documentation, specs, and prompts** are stored in `.guides/`
- Use `.guides/assessment/` for project analysis and discovery
- Use `.guides/architecture/` for system design and setup guides
- Use `.guides/prompts/` for executable YAML prompts
- Use `.guides/personas/` for role definitions
- Use `.guides/schema/` for validation schemas

### Code Organization

- Store source code in `src/`
- Store data files in `data/`
- Store configuration in `config/`
- Use TypeScript with strict mode enabled
- Follow ESLint and Prettier configurations

### Prompt Development

- All prompts must validate against `.guides/schema/prompt.schema.json`
- Required fields: `apiVersion`, `id`, `title`, `persona`, `category`, `difficulty`, `context`, `steps`, `output`, `version`
- Use valid persona IDs: SystemIntegrator, SoftwareDeveloper, CodeAuditor, ProductStrategist, QAEngineer, DevOpsOrchestrator, AIEngineer, DocumentationCurator, Maintainer
- Categories include: setup, analysis, design, implementation, testing, deployment, maintenance
- Difficulty levels: easy, medium, hard

### Development Workflow

- Generate worklogs for all development activities
- Use structured steps with clear actions and expected outputs
- Validate all YAML against schemas before execution
- Document decisions and rationale in `.guides/operation/`

## Behavioral Guidelines

1. **Always check `.guides/` first** for existing documentation and standards
2. **Suggest prompt-based solutions** when users describe tasks or workflows
3. **Recommend appropriate personas** for different types of work
4. **Enforce schema validation** for all YAML prompts
5. **Generate traceable outputs** in `.guides/` for all development activities
6. **Use TypeScript strict mode** with proper typing
7. **Follow established folder structure** and naming conventions
8. **Create step-by-step instructions** using imperative verbs
9. **Include proper error handling** and retry mechanisms in prompts
10. **Maintain version control** for all prompts and documentation

## Code Quality Standards

- Use TypeScript with strict mode enabled
- Follow ESLint and Prettier configurations
- Write comprehensive tests for all code
- Include JSDoc comments for public APIs
- Use semantic versioning for prompts and schemas
- Validate all JSON Schema files against meta-schemas

## File Naming Conventions

- Prompts: `prompt.{category}.yaml` or `prompt.{specific-task}.yaml`
- Personas: `personas.yaml` for the main list
- Schemas: `{type}.schema.json`
- Documentation: `{category}.{specific}.md`
- Use kebab-case for file names and snake_case for IDs

When suggesting code or documentation changes, always consider the Guided Engineering methodology and ensure suggestions align with the established patterns and principles.
