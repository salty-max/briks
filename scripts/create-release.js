const { execSync } = require('child_process');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`, error);
    process.exit(1);
  }
}

// I. Run changeset to choose version bump
console.log('🏷️ Running changeset version...');
runCommand('pnpm run changeset');

// II. Version packages
console.log('📦 Versioning packages...');
runCommand('pnpm run version-packages');

// Get package version
const packageVersion = require('../packages/ui/package.json').version;

const branchName = `release/v${packageVersion}`;

// III. Create release branch
console.log('🌳 Creating release branch...');
runCommand(`git checkout -b ${branchName}`);

// IV. Commit changes
console.log('💾 Committing changes...');
runCommand('git add . && git commit -m "chore(release): v${packageVersion}"');

// V. Push changes
console.log('🚀 Pushing changes...');
runCommand(`git push origin ${branchName}`);

// VI. Create PR
console.log('🚀 Creating PR...');
runCommand(
  `gh pr create --base main --head ${branchName} --title "release/v${packageVersion}" --body "Release version ${packageVersion}"`,
);

// VII. Create git tag
// console.log('🏷️ Creating git tag...');
// runCommand(`git tag v${packageVersion}`);
// runCommand(`git push origin v${packageVersion}`);

console.log(`🎉 Release ${packageVersion} created! 🎉`);
// Give link to newly created PR
console.log(`🔗 https://github.com/briks/pull/${process.env.GITHUB_PR_NUMBER}`);
