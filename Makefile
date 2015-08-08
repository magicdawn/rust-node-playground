
rust:
	@rustc process.rs --crate-type dylib

run: rust
	@node all.js

.PHONY: rust run