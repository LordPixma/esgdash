# Contributing to ESGDash

Thank you for your interest in contributing to ESGDash! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or suggest features
- Check if the issue already exists before creating a new one
- Provide as much detail as possible:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Screenshots if applicable
  - Environment details (OS, Node.js version, etc.)

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes:**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation
4. **Test your changes:**
   ```bash
   npm run build
   npm run test
   ```
5. **Commit your changes:**
   ```bash
   git commit -m "Add feature: description"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Project Structure

```
esgdash/
├── apps/
│   ├── api/          # Cloudflare Workers API
│   └── web/          # React frontend
├── packages/
│   └── shared/       # Shared types and utilities
└── docs/            # Documentation
```

### Adding New Data Sources

1. Add types to `packages/shared/src/types.ts`
2. Create handler in `apps/api/src/`
3. Add route in `apps/api/src/index.ts`
4. Create chart component in `apps/web/src/components/`
5. Update documentation

### Testing

- Test all API endpoints
- Verify frontend renders correctly
- Check both demo mode and real data mode
- Test on different browsers if making UI changes

### Documentation

- Update README.md if adding major features
- Add JSDoc comments for new functions
- Update DEVELOPMENT.md for architectural changes
- Include examples in documentation

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other unprofessional conduct

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing to ESGDash, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
