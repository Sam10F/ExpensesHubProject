# Task: [TASK_NAME]

**Created:** [DATE]  
**Status:** [Backlog/In Progress/In Review/Done]  
**Assignee:** [ASSIGNEE_NAME]  
**Priority:** [Critical/High/Medium/Low]  
**Estimated Effort:** [Time estimate]  
**Sprint:** [Sprint number/name]

## Description

[Clear, concise description of what needs to be done]

## Category

Select the appropriate category (aligned with constitutional principles):

- [ ] **Feature Development:** New user-facing functionality
- [ ] **Code Quality Improvement:** Refactoring, documentation, type safety
- [ ] **Testing:** Playwright E2E tests, test maintenance
- [ ] **UX Enhancement:** Design system, accessibility, responsiveness
- [ ] **Performance Optimization:** Bundle size, API optimization, rendering
- [ ] **Bug Fix:** Defect resolution
- [ ] **Technical Debt:** Addressing documented debt
- [ ] **Infrastructure:** CI/CD, tooling, monitoring
- [ ] **Documentation:** README, guides, API docs

## Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Constitutional Compliance Checklist

### Code Quality Excellence (Principle 1)

- [ ] Code follows TypeScript strict mode
- [ ] Functions are focused and under 50 lines
- [ ] Descriptive naming conventions used
- [ ] JSDoc comments for public APIs
- [ ] Error handling implemented
- [ ] Code reviewed by peer
- [ ] Linter and formatter passing

### Testing Standards (Principle 2)

- [ ] Playwright E2E tests written for user-facing changes
- [ ] Tests are reliable and non-flaky
- [ ] Tests follow Page Object Model pattern
- [ ] All tests passing in CI

### User Experience Consistency (Principle 3)

- [ ] Design system components used
- [ ] Responsive design implemented (mobile/tablet/desktop)
- [ ] WCAG 2.1 AA compliance verified
- [ ] Loading states added for async operations
- [ ] Error messages are user-friendly
- [ ] Interaction feedback provided

### Performance Requirements (Principle 4)

- [ ] Bundle size impact measured
- [ ] Core Web Vitals targets met
- [ ] API responses optimized
- [ ] Caching strategy implemented
- [ ] Performance monitoring verified

## Technical Notes

### Implementation Details

[Technical approach, algorithms, patterns to use]

### Dependencies

- Blocked by: [Task IDs or descriptions]
- Blocks: [Task IDs or descriptions]
- Related to: [Task IDs or descriptions]

### Files to Modify

- `[file/path1.ts]` - [What changes]
- `[file/path2.tsx]` - [What changes]

### Testing Plan

#### Playwright E2E Tests

```typescript
// Test: [Test name]
// Path: tests/e2e/[feature].spec.ts

test("[test description]", async ({ page }) => {
  // Test implementation
});
```

## Subtasks

- [ ] [Subtask 1]
- [ ] [Subtask 2]
- [ ] [Subtask 3]

## Definition of Done

Task is considered complete when:

- [ ] All acceptance criteria met
- [ ] All constitutional compliance checks passed
- [ ] Code reviewed and approved
- [ ] All tests passing (including Playwright E2E)
- [ ] Documentation updated
- [ ] Changes deployed to staging
- [ ] QA verified (if applicable)

## Notes

[Additional context, decisions made, challenges encountered]

## References

- Related spec: [Link]
- Design: [Link]
- Discussion: [Link]
