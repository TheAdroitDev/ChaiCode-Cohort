# Topics Covered this week 

## Semantic versioning 
In SemVer (Semantic Versioning), symbols like ^ (caret), ~ (tilde), and * are used to specify the type of version upgrades a package can accept. These symbols dictate how a package's version number should be incremented based on the nature of the changes introduced. 
### SemVer Symbols and Their Meanings:
1. ^ (Caret):
Allows upgrades to minor and patch versions, but prevents upgrades to major versions that introduce breaking changes. For example, ^1.2.3 would allow upgrades to 1.2.4, 1.3.0, but not 2.0.0. 
2. ~ (Tilde):
Allows upgrades to patch versions, but prevents upgrades to minor or major versions. For instance, ~1.2.3 would allow upgrades to 1.2.4, but not 1.3.0 or 2.0.0. 
3. *(Asterisk):
Indicates that any version is acceptable, including breaking changes. It's equivalent to no version constraint and is often used when specifying a dependency that is not yet using SemVer. 
### Other SemVer related symbols:
- (Greater than >): Specifies that versions must be greater than the specified version. 
- (Greater than or equal to >= ): Specifies that versions must be greater than or equal to the specified version. 
- = (Equal to): Specifies that versions must be exactly equal to the specified version. 
- < (Less than): Specifies that versions must be less than the specified version. 
- <= (Less than or equal to): Specifies that versions must be less than or equal to the specified version. 
- (Range -): Specifies a range of versions, including and excluding certain versions. 
- x, X, * (Wildcard): Can be used as a wildcard character in comparisons, allowing for more flexible version matching. 
### Example:
In a ```package.json``` file: Code

``` 
"dependencies": {
  "lodash": "^4.17.21",
  "moment": "~2.29.1",
  "react": "*"
}
```
This example indicates that:
lodash can be upgraded to any minor or patch version, but not to major versions that introduce breaking changes. 
moment can be upgraded to any patch version, but not to minor or major versions. 

react can be any version, including breaking changes. 
By using these symbols, developers can specify the desired level of flexibility when upgrading dependencies while avoiding compatibility issues. 

## Drop in Replacement -
a component, service, library, or system that can directly replace an existing one with minimal or no changes to the surrounding code or infrastructure.

---

## Internals 
### curl
cURL is a command-line tool and library used for transferring data with URLs. It supports various protocols like HTTP, HTTPS, FTP, and more, making it a versatile tool for interacting with web services and APIs. 

Example: A POST request 
``` 
curl -X POST https://localhost:8000
```
Example: A GET request 
``` 
curl https://localhost:8000
```


